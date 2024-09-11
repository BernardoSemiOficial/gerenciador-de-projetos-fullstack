import { FastifyRequest } from "fastify";
import { ClientError } from "../errors/client-error";
import { AuthenticatedUser } from "../models/authenticated-user.model";
import { TokenService } from "../services/token.service";

export class AuthorizationMiddleware {
  static async verifyToken(request: FastifyRequest): Promise<void> {
    const tokenWithBearer = request.headers.authorization;
    if (!tokenWithBearer) {
      throw new ClientError({ message: "Unauthorized", code: 401 });
    }
    const token = tokenWithBearer.split(" ")[1];
    const tokenDecoded = TokenService.verifyToken(token);
    request.authenticatedUser = tokenDecoded;
  }
}

declare module "fastify" {
  export interface FastifyRequest {
    authenticatedUser?: AuthenticatedUser;
  }
}
