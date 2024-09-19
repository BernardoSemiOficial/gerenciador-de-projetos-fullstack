import { FastifyReply, FastifyRequest } from "fastify";
import { RoleId } from "../../enums/roles.enum";
import { env } from "../../env";
import { ClientError } from "../../errors/client-error";
import { EmailTemplates } from "../../models/email-templates";
import {
  InvitationForUsersClient,
  ProjectForUserClient,
  UserClient,
} from "../../models/user.model";
import { ProjectsRespository } from "../../repositories/projects/projects.repository";
import { UsersRespository } from "../../repositories/users/users.repository";
import { EmailService } from "../../services/email.service";
import { UsersControllerSchemaType } from "./users.schema";

export class UsersController {
  static async getUsers(_: FastifyRequest, reply: FastifyReply) {
    const users = await UsersRespository.getUsers();
    const usersClient = users.map((user) => new UserClient(user));
    return reply.status(201).send({ users: usersClient });
  }

  static async getUser(
    request: FastifyRequest<{
      Params: UsersControllerSchemaType["getUserByPublicId"];
    }>,
    reply: FastifyReply
  ) {
    const { publicId } = request.params;
    const user = await UsersRespository.findUserByPublicId({
      publicId,
    });

    if (!user) {
      throw new ClientError({ message: "User not found", code: 404 });
    }

    const userClient = new UserClient(user);

    return reply.status(201).send({ user: userClient });
  }

  static async getProjectsByUser(
    request: FastifyRequest<{
      Params: UsersControllerSchemaType["getProjectsForUserParams"];
    }>,
    reply: FastifyReply
  ) {
    const { publicId } = request.params;
    const projects = await UsersRespository.findProjectsByUser({ publicId });
    const projectForUserClient = projects.map(
      (project) => new ProjectForUserClient(project)
    );
    return reply.status(200).send({ projects: projectForUserClient });
  }

  static async createInvitationForUsers(
    request: FastifyRequest<{
      Body: UsersControllerSchemaType["createInvitationForUsersBody"];
    }>,
    reply: FastifyReply
  ) {
    const invitationForUsers = request.body;
    const userPublicId = request.authenticatedUser?.publicId;
    const userEmail = request.authenticatedUser?.email;

    const invitationForUsersEmail = invitationForUsers.map(
      (user) => user.email
    );
    const usersInTheSystem = await UsersRespository.findAllUsersByEmail(
      invitationForUsersEmail
    );

    const invitationForUserProjectsId = invitationForUsers
      .map((user) => user.projectsId)
      .flat();
    const projectsInTheSystem =
      await ProjectsRespository.findAllProjectsByPublicId(
        invitationForUserProjectsId
      );

    const usersEmailInTheSystem = usersInTheSystem.map((user) => user.email);
    const newUsers = invitationForUsers.filter(
      (user) => !usersEmailInTheSystem.includes(user.email)
    );
    const currentUsers = invitationForUsers
      .filter((user) => usersEmailInTheSystem.includes(user.email))
      .map((user) => ({
        ...user,
        id: usersInTheSystem.find((u) => u.email === user.email)!.id,
      }));

    const insertCurrentUsersInProjects = currentUsers.map(async (user) => {
      const userProjectsToAdd = projectsInTheSystem.filter((p) =>
        user.projectsId.includes(p.public_id)
      );
      const newUserInProjectLine = userProjectsToAdd.map((project) => ({
        is_owner: false,
        user_id: user.id,
        project_id: project.id,
        role_id: RoleId.CONTRIBUTOR,
      }));
      return UsersRespository.createProjectsForUser(newUserInProjectLine);
    });
    await Promise.all(insertCurrentUsersInProjects);

    const invitationsPromise = newUsers.map(async (user) =>
      UsersRespository.createInvitationForUsers({
        user_public_id: userPublicId,
        email: user.email,
        projects_id: user.projectsId.map((projectId) => ({
          public_id: projectId,
        })),
      })
    );
    const invitations = await Promise.all(invitationsPromise);

    const invitationsClient = invitations.map(
      (invitation) => new InvitationForUsersClient(invitation)
    );

    const invitationsEmailsPromise = invitationsClient.map(async (user) =>
      EmailService.sendEmail(
        EmailTemplates.InvitationUser,
        { name: user.email, address: user.email },
        {
          email: user.email,
          create_user_link:
            env.FRONTEND_URL + "/invitation" + `?invitation=${user.id}`,
          user_owner: userEmail,
        }
      )
    );
    await Promise.all(invitationsEmailsPromise);

    return reply.status(201).send({ invitations: invitationsClient });
  }
}
