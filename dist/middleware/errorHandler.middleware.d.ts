import { Request, Response, NextFunction } from "express";
/**
 * Interface para erros com propriedades adicionais
 */
interface ErrorWithCode extends Error {
    code?: string;
    statusCode?: number;
    status?: string;
    errors?: string[];
}
/**
 * Middleware global de tratamento de erros
 * Deve ser o último middleware na cadeia
 */
declare const errorHandler: (err: ErrorWithCode, req: Request, res: Response, next: NextFunction) => Response | void;
export default errorHandler;
//# sourceMappingURL=errorHandler.middleware.d.ts.map