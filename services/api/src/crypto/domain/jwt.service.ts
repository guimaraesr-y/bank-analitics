export interface JWTSignOptions {
  algorithm?: string;
  expiresIn?: string;
  notBefore?: string;
  audience?: string;
  issuer?: string;
  subject?: string;
}

export interface JwtService {
  sign(payload: string | object, options?: JWTSignOptions): string;
  verify(token: string): string | object;
}
