import * as model from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NotFoundError, UnauthorizedError } from "../errors";
import type { userType } from "@/lib/types/User";

export async function login(email: string, password: string): Promise<{token: string, user: userType}> {
  const user = await model.findByEmailUser(email);

  if (!user) throw new NotFoundError("Usuário não encontrado");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new UnauthorizedError("Senha inválida");
  const token = jwt.sign(
    {userId: user.id}, 
    process.env.JWT_SECRET!, 
    {expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']}
  );

  return {token, user};
}
