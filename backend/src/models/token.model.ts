export interface TokenPayload {
  publicId: string;
  email: string;
}

export interface TokenDecoded extends TokenPayload {
  iss: string | undefined;
  sub: string | undefined;
  aud: string | string[] | undefined;
  exp: number | undefined;
  nbf: number | undefined;
  iat: number | undefined;
  jti: string | undefined;
}
