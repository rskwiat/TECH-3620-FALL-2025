import 'dotenv/config';
import { sign } from 'hono/jwt';
import bcrypt from 'bcrypt';

import { db } from '../../db/database.js';
import * as HttpStatusCodes from '../constants/status-codes.js'

const saltRounds = 10; // Try an integer 10-12
const salt = await bcrypt.genSalt(saltRounds);

export async function registerUser(c) {
  try {
    const { email, password } = await c.req.json();
    const saltedPassword = await bcrypt.hash(password, salt);

    const result = db.prepare("INSERT INTO users (email, password) VALUES (?,?)").run(email, saltedPassword);

    return c.json({
      message: 'user registered',
      id: result.lastInsertRowid
    }, 200);
  } catch (error) {

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return c.json({
        message: 'Email already registered'
      }, HttpStatusCodes.CONFLICT);
    }

    return c.json({
      message: 'Internal Service Error',
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function loginUser(c) {
  try {
    const { email, password } = await c.req.valid('json');
    
    // const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
      return c.json({
        message: 'Invalid email or password'
      }, HttpStatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return c.json({
        message: 'Invalid email or password'
      }, HttpStatusCodes.UNAUTHORIZED);
    }

    const payload = {
      email,
      exp: '30d'
    };
    const secret = process.env.JWT;
    const token = await sign(payload, secret);

    return c.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      }
    }, HttpStatusCodes.OK);

  } catch(error) {
    return c.json({
      message: 'Internal Service Error'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function requestPasswordReset(e) {

};

export async function resetPassword(e) {

};

export async function verifyEmail(e) {
  
};

