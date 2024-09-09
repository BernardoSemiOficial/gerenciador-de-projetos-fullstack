import { env } from "../env";
import { libraries } from "../libraries";
import { TokenDecoded, TokenPayload } from "../models/token.model";

export class TokenService {
  private static readonly SECRET_KEY = env.SECRET_KEY_TOKEN;

  static generateTokenUser(
    user: TokenPayload,
    { isAccessToken }: { isAccessToken: boolean }
  ): string {
    if (isAccessToken) {
      try {
        const accessToken = this.generateToken(user, true);
        return accessToken;
      } catch (error) {
        throw new Error("Error generating token");
      }
    }
    return this.generateToken(user, false);
  }

  static verifyToken(token: string): TokenDecoded {
    try {
      const decoded = libraries.jwt.verify(token, this.SECRET_KEY);
      return decoded as TokenDecoded;
    } catch (error) {
      throw new Error("Invalid token");
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
      throw new Error("Error generating token");
    }
  }
}
