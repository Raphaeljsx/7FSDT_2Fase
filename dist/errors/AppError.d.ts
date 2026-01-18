/**
 * Classe base para erros customizados da aplicação
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly status: string;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
//# sourceMappingURL=AppError.d.ts.map