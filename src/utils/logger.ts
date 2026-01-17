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

const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const formatMessage = (
  level: string,
  message: string,
  meta: Record<string, any> = {}
): LogEntry => {
  const timestamp = new Date().toISOString();
  const logEntry: LogEntry = {
    timestamp,
    level,
    message,
    ...meta,
  };

  if (isDevelopment) {
    // Em desenvolvimento, formatação mais legível
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta);
  } else {
    // Em produção, JSON estruturado
    console.log(JSON.stringify(logEntry));
  }

  return logEntry;
};

const logger: Logger = {
  error: (message: string, meta: Record<string, any> = {}): LogEntry | void => {
    if (!isTest) {
      return formatMessage('error', message, meta);
    }
  },

  warn: (message: string, meta: Record<string, any> = {}): LogEntry | void => {
    if (!isTest) {
      return formatMessage('warn', message, meta);
    }
  },

  info: (message: string, meta: Record<string, any> = {}): LogEntry | void => {
    if (!isTest) {
      return formatMessage('info', message, meta);
    }
  },

  debug: (message: string, meta: Record<string, any> = {}): LogEntry | void => {
    if (isDevelopment && !isTest) {
      return formatMessage('debug', message, meta);
    }
  },
};

export default logger;