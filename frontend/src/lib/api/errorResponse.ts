import { NextResponse } from "next/server";
import { AppError, ValidationError } from "../errors";

export function errorToResponse(error: unknown): NextResponse {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { status: "fail", message: error.message, errors: error.errors },
      { status: error.statusCode }
    );
  }
  if (error instanceof AppError) {
    return NextResponse.json(
      { status: error.status, message: error.message },
      { status: error.statusCode }
    );
  }
  const err = error instanceof Error ? error : new Error("Erro desconhecido");
  const code = (error as NodeJS.ErrnoException)?.code;
  const status = code === "ECONNREFUSED" || code === "ENOTFOUND" ? 503 : 500;
  const message =
    status === 503
      ? "Serviço indisponível. Verifique se o PostgreSQL está rodando e as variáveis de ambiente (DB_HOST, DB_PORT, etc.)."
      : err.message;
  return NextResponse.json(
    { status: "error", message },
    { status }
  );
}
