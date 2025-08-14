import { pinoLogger } from 'hono-pino';

export function Logger() {
  return pinoLogger({
    pino: {
      level: 'debug',
    },
    http: {
      referRequestIdKey: crypto.randomUUID()
    },
  })
};
