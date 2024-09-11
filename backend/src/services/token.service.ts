import { env } from "../env";
import { ClientError } from "../errors/client-error";
import { ServerError } from "../errors/server-error";
import { libraries } from "../libraries";
import { TokenDecoded, TokenPayload } from "../models/token.model";

export class TokenService {
  private static readonly SECRET_KEY = env.SECRET_KEY_TOKEN;

  static generateTokenUser(
    user: TokenPayload,
    { isAccessToken }: { isAccessToken: boolean }
  ): string {
    if (isAccessToken) {
      const accessToken = this.generateToken(user, true);
      return accessToken;
    }
    return this.generateToken(user, false);
  }

  static verifyToken(token: string): TokenDecoded {
    try {
      const decoded = libraries.jwt.verify(token, this.SECRET_KEY);
      return decoded as TokenDecoded;
    } catch (error) {
      throw new ClientError({ message: "Invalid Token", code: 401 });
    }
  }

  private static generateToken(
    user: TokenPayload,
    isAccessToken: boolean
  ): string {
    const expiration = {
      accessToken: env.ACCESS_TOKEN_DURATION,
      refreshToken: env.REFRESH_TOKEN_DURATION,
    };
    try {
      const token = libraries.jwt.sign(user, this.SECRET_KEY, {
        expiresIn: isAccessToken
          ? expiration.accessToken
          : expiration.refreshToken,
      });
      return token;
    } catch (error) {
      throw new ServerError({ message: (error as Error).message });
    }
  }
}
