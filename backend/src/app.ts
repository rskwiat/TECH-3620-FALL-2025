import { Hono } from 'hono';

import { db, initializeDatabase } from '../db/database.js';

import {
  loginUser,
  registerUser
} from './routes/auth.js';

import { validateUser } from './middlewares/validators.js';

const app = new Hono();
initializeDatabase();

// app.get('/', (c) => {
//       const users = db.prepare('SELECT * FROM users').all();
//   return c.json(users);
// });


app.post('/register', validateUser,  registerUser);
app.post('/login', validateUser, loginUser);
export { app };
