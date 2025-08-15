import 'dotenv/config';
import { pinoLogger } from 'hono-pino';


export function Logger() {
  return pinoLogger({
    pino: {
      level: process.env.LOG_LEVEL,
    },
    http: {
      referRequestIdKey: crypto.randomUUID()
    },
  })
};
