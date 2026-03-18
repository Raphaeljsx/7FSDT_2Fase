import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as userModel from "@/lib/models/user.model";
import { ensureUsersTable } from "@/lib/db/init";
import { signToken } from "@/lib/auth/jwt";
import { errorToResponse } from "@/lib/api/errorResponse";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/lib/errors";

function toPublic(user: { id: number; email: string; name: string | null; created_at: Date; updated_at: Date }) {
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

export async function POST(request: NextRequest) {
  try {
    await ensureUsersTable();

    const body = await request.json();
    const { email, password } = body;

    if (!email?.trim() || !password) {
      throw new ValidationError("Email e senha são obrigatórios");
    }

    const user = await userModel.findByEmailUser(email.trim());
    if (!user) throw new NotFoundError("Usuário não encontrado");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new UnauthorizedError("Senha inválida");

    const token = signToken(user.id);
    return NextResponse.json({ user: toPublic(user), token }, { status: 200 });
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return errorToResponse(error);
  }
}
