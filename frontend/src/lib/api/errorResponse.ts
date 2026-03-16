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
  const message =
    error instanceof Error ? error.message : "Erro interno do servidor";
  return NextResponse.json(
    { status: "error", message },
    { status: 500 }
  );
}
