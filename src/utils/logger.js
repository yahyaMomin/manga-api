import { pino } from 'pino';

// Check environment
const isDev = true;

// Logger options
const logger = pino({
  level: 'info',
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
