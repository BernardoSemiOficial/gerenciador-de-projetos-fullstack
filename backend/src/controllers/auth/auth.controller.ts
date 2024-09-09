import { FastifyReply, FastifyRequest } from "fastify";
import { TokenPayload } from "../../models/token.model";
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
      throw new Error("Not authorized");
    }

    const isPasswordEqual = await BcriptService.compareHash(
      password,
      user.password
    );

    if (!isPasswordEqual) {
      throw new Error("Not authorized");
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

    return reply.status(201).send({ accessToken, refreshToken });
  }

  static async register(
    request: FastifyRequest<{
      Body: AuthControllerSchemaType["registerBody"];
    }>,
    reply: FastifyReply
  ) {
    const { name, email, password } = request.body;
    const hashPassword = await BcriptService.generateHash(password);
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
    return reply.status(201).send({ user, accessToken, refreshToken });
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
