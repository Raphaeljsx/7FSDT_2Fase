/**
 * Sistema de logging estruturado
 * Em produção, pode ser substituído por winston ou pino
 */

interface LogMeta {
  [key: string]: any;
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  [key: string]: any;
}

const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const formatMessage = (level: string, message: string, meta: LogMeta = {}): LogEntry => {
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

interface Logger {
  error: (message: string, meta?: LogMeta) => void;
  warn: (message: string, meta?: LogMeta) => void;
  info: (message: string, meta?: LogMeta) => void;
  debug: (message: string, meta?: LogMeta) => void;
}

const logger: Logger = {
  error: (message: string, meta: LogMeta = {}): void => {
    if (!isTest) {
      formatMessage('error', message, meta);
    }
  },

  warn: (message: string, meta: LogMeta = {}): void => {
    if (!isTest) {
      formatMessage('warn', message, meta);
    }
  },

  info: (message: string, meta: LogMeta = {}): void => {
    if (!isTest) {
      formatMessage('info', message, meta);
    }
  },

  debug: (message: string, meta: LogMeta = {}): void => {
    if (isDevelopment && !isTest) {
      formatMessage('debug', message, meta);
    }
  },
};

export default logger;
