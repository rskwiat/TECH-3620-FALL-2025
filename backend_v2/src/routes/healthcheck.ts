import type { Context } from 'hono';
import * as HttpStatusCodes from '../constants/status-codes.js';

export async function healthCheck(c: Context) {
  return c.json({
    'message': 'Application is running'
  }, HttpStatusCodes.OK);
};
