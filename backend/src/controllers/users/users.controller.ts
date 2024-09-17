import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../env";
import { ClientError } from "../../errors/client-error";
import { EmailTemplates } from "../../models/email-templates";
import {
  InvitationForUsersClient,
  InviteForUserClient,
  ProjectForUserClient,
  UserClient,
} from "../../models/user.model";
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

  static async getInvitationForUser(
    request: FastifyRequest<{
      Params: UsersControllerSchemaType["getInvitationForUserParams"];
    }>,
    reply: FastifyReply
  ) {
    const { invitePublicId } = request.params;
    const inviteUser = await UsersRespository.findInviteByPublicId({
      invitePublicId,
    });

    if (!inviteUser) {
      throw new ClientError({ message: "Invite not found", code: 404 });
    }

    const inviteUserClient = new InviteForUserClient(inviteUser);

    return reply.status(200).send({ invite: inviteUserClient });
  }

  static async deleteInvitationForUser(
    request: FastifyRequest<{
      Params: UsersControllerSchemaType["deleteInvitationForUserParams"];
    }>,
    reply: FastifyReply
  ) {
    const { invitePublicId } = request.params;
    await UsersRespository.deleteInviteByPublicId({
      invitePublicId,
    });
    return reply
      .status(200)
      .send({ invite: `Invite ${invitePublicId} deleted` });
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

    const invitationsPromise = invitationForUsers.map(async (user) =>
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
        EmailTemplates.InviteUser,
        { name: user.email, address: user.email },
        {
          email: user.email,
          create_user_link:
            env.FRONTEND_URL +
            "/invitation-for-user" +
            `?invitation=${user.id}`,
          user_owner: userEmail,
        }
      )
    );
    await Promise.all(invitationsEmailsPromise);

    return reply.status(201).send({ invitations: invitationsClient });
  }
}
