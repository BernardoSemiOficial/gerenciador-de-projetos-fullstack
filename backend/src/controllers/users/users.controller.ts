import { FastifyReply, FastifyRequest } from "fastify";
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
    return reply.status(201).send({ user });
  }
}
