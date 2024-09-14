import { FastifyReply, FastifyRequest } from "fastify";
import { ClientError } from "../../errors/client-error";
import { TokenPayload } from "../../models/token.model";

import { UserClient } from "../../models/user.model";
import { UsersRespository } from "../../repositories/users/users.repository";
import { BcriptService } from "../../services/bcript.service";
import { TokenService } from "../../services/token.service";
import { AuthControllerSchemaType } from "./auth.schema";

export class AuthController {
  static async login(
    request: FastifyRequest<{ Body: AuthControllerSchemaType["loginBody"] }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;
    const user = await UsersRespository.findUserByEmail({
      email,
      selectPassword: true,
    });

    if (!user) {
      throw new ClientError({ message: "Not authorized", code: 401 });
    }

    const isPasswordEqual = await BcriptService.compareHash(
      password,
      user.password
    );

    if (!isPasswordEqual) {
      throw new ClientError({ message: "Not authorized", code: 401 });
    }

    const tokenPayload: TokenPayload = {
      publicId: user.public_id,
      email: user.email,
    };
    const accessToken = TokenService.generateTokenUser(tokenPayload, {
      isAccessToken: true,
    });
    const refreshToken = TokenService.generateTokenUser(tokenPayload, {
      isAccessToken: false,
    });
    const userClient = new UserClient(user);

    return reply
      .status(200)
      .send({ accessToken, refreshToken, user: userClient });
  }

  static async register(
    request: FastifyRequest<{
      Body: AuthControllerSchemaType["registerBody"];
    }>,
    reply: FastifyReply
  ) {
    const { name, email, password } = request.body;
    const hashPassword = await BcriptService.generateHashPassword(password);
    const user = await UsersRespository.createUser({
      name,
      email,
      password: hashPassword,
    });

    const tokenPayload: TokenPayload = {
      publicId: user.public_id,
      email: user.email,
    };
    const accessToken = TokenService.generateTokenUser(tokenPayload, {
      isAccessToken: true,
    });
    const refreshToken = TokenService.generateTokenUser(tokenPayload, {
      isAccessToken: false,
    });

    const userClient = new UserClient(user);

    return reply
      .status(201)
      .send({ accessToken, refreshToken, user: userClient });
  }

  static async refreshToken(
    request: FastifyRequest<{
      Body: AuthControllerSchemaType["refreshTokenBody"];
    }>,
    reply: FastifyReply
  ) {
    const { refreshToken } = request.body;
    const tokenDecoded = TokenService.verifyToken(refreshToken);
    const userPublicId = tokenDecoded.publicId;
    const user = await UsersRespository.findUserByPublicId({
      publicId: userPublicId,
    });

    if (!user) {
      throw new Error("Cannot generate a new token");
    }

    const tokenPayload: TokenPayload = {
      publicId: user.public_id,
      email: user.email,
    };

    const accessToken = TokenService.generateTokenUser(tokenPayload, {
      isAccessToken: true,
    });

    return reply.status(200).send({ accessToken });
  }
}
