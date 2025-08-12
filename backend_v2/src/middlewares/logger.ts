import { pinoLogger } from 'hono-pino';
import { requestId } from 'hono/request-id';

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
