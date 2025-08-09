import { pinoLogger } from 'hono-pino';
// import { , transport } from 'pino';
import { requestId } from 'hono/request-id';

export function Logger() {
  return pinoLogger({
    pino: {
      level: 'debug',
      transport: {
        target: 'pino-pretty'
      }
    },
    http: {
      referRequestIdKey: crypto.randomUUID()
    },
    
  })
};
