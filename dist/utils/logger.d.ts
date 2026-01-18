/**
 * Sistema de logging estruturado
 * Em produção, pode ser substituído por winston ou pino
 */
interface LogEntry {
    timestamp: string;
    level: string;
    message: string;
    [key: string]: any;
}
interface Logger {
    error: (message: string, meta?: Record<string, any>) => LogEntry | void;
    warn: (message: string, meta?: Record<string, any>) => LogEntry | void;
    info: (message: string, meta?: Record<string, any>) => LogEntry | void;
    debug: (message: string, meta?: Record<string, any>) => LogEntry | void;
}
declare const logger: Logger;
export default logger;
//# sourceMappingURL=logger.d.ts.map