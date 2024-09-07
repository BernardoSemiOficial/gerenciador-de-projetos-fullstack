import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  email: string;
}

export interface Token {
  userId: string;
  accessToken: string;
  isRevoked: boolean;
}

export interface TokenDecoded extends TokenPayload, JwtPayload {}
