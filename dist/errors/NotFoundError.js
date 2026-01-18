"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AppError_1 = require("./AppError");
/**
 * Erro para recursos não encontrados (404)
 */
class NotFoundError extends AppError_1.AppError {
    constructor(message = "Recurso não encontrado") {
        super(message, 404);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
NotFoundError;
//# sourceMappingURL=NotFoundError.js.map