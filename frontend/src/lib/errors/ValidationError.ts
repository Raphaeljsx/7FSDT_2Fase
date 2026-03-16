import { AppError } from "./AppError";

export class ValidationError extends AppError {
  public readonly errors: string[];

  constructor(message: string = "Dados inválidos", errors: string[] = []) {
    super(message, 400);
    this.name = "ValidationError";
    this.errors = errors;
  }
}
