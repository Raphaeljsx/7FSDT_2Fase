import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as userModel from "@/lib/models/user.model";
import { ensureUsersTable } from "@/lib/db/init";
import { signToken } from "@/lib/auth/jwt";
import { errorToResponse } from "@/lib/api/errorResponse";
import { ValidationError } from "@/lib/errors";

const SALT_ROUNDS = 10;

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
    const { email, password, name } = body;

    const errors: string[] = [];
    if (!email?.trim()) errors.push("Email é obrigatório");
    if (!password || password.length < 6) errors.push("Senha deve ter no mínimo 6 caracteres");
    if (errors.length > 0) throw new ValidationError("Dados inválidos", errors);

    const existing = await userModel.findByEmailUser(email.trim());
    if (existing) throw new ValidationError("Email já cadastrado");

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.createUser({
      email: email.trim(),
      password: passwordHash,
      name: name?.trim() ?? "",
    });

    const token = signToken(user.id);
    return NextResponse.json({ user: toPublic(user), token }, { status: 201 });
  } catch (error) {
    return errorToResponse(error);
  }
}
