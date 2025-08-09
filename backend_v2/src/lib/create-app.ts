import { Hono } from 'hono';
import { Logger } from "../middlewares/logger.js";
import * as HttpStatusMessages from '../constants/status-messages.js';
import * as HttpStatusCodes from '../constants/status-codes.js';

export default function createApp() {
  const app = new Hono();
  app.use(Logger());

  app.notFound((c) => {
    return c.json({
      message: `${HttpStatusMessages.NOT_FOUND} - ${c.req.path}`
    }, HttpStatusCodes.NOT_FOUND);
  });

  app.onError((err, c) => {
    return c.json({
      message: err.message
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  });

  return app;
}
