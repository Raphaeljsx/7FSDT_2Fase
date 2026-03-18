import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/lib/errors";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
const TOKEN_COOKIE = "auth_token";

export function signToken(userId: number): string {
  if (!secret) throw new Error("JWT_SECRET não está definido");
  return jwt.sign(
    { userId },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );
}

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  const cookie = request.cookies.get(TOKEN_COOKIE)?.value;
  return cookie ? decodeURIComponent(cookie) : null;
}

export function getUserIdFromRequest(request: NextRequest): number {
  if (!secret) throw new Error("JWT_SECRET não está definido");
  const token = getTokenFromRequest(request);
  if (!token) throw new UnauthorizedError("Token não informado");
  try {
    const payload = jwt.verify(token, secret) as { userId: number };
    return payload.userId;
  } catch {
    throw new UnauthorizedError("Token inválido ou expirado");
  }
}
