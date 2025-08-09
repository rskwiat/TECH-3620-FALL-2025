import { validator } from 'hono/validator';
import { z } from 'zod';
import * as HttpStatusCodes from '../constants/status-codes.js';

const userSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const validateUser = validator('json', (value, c) => {
  const result = userSchema.safeParse(value);
  
  if (!result.success) {
    return c.json({ 
      message: 'Validation failed',
      details: result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    }, HttpStatusCodes.BAD_REQUEST);
  }

  return result.data;
})
