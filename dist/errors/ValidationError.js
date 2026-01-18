"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const AppError_1 = require("./AppError");
/**
 * Erro para validação de dados (400)
 */
class ValidationError extends AppError_1.AppError {
    constructor(message = "Dados inválidos", errors = []) {
        super(message, 400);
        this.name = "ValidationError";
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map