import { FastifyReply, FastifyRequest } from "fastify";
import { ClientError } from "../../errors/client-error";
import { ProjectForUserClient, UserClient } from "../../models/user.model";
import { UsersRespository } from "../../repositories/users/users.repository";
import { UsersControllerSchemaType } from "./users.schema";

export class UsersController {
  static async getUsers(_: FastifyRequest, reply: FastifyReply) {
    const users = await UsersRespository.getUsers();
    return reply.status(201).send({ users });
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
}
