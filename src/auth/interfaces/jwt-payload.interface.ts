export interface JWTPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}
