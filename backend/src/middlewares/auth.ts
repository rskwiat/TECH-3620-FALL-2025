import 'dotenv/config';
import type { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

import * as HttpStatusCodes from '../constants/status-codes.js';
// import { userQueries } from '../db/helpers.js';

export const authJWT = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }
    const token = authHeader.substring(7);
    const payload = await verify(token, process.env.JWT_SECRET!);
    c.set('userId', payload.userId);
    await next();
  } catch (error) {
    return c.json({
      error: 'Invalid Token'
    }, HttpStatusCodes.UNAUTHORIZED);
  }

}
