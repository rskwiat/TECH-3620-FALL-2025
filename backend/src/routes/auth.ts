import 'dotenv/config';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';
import * as crypto from 'node:crypto';

import * as HttpStatusCodes from '../constants/status-codes.js'
import { userQueries, journalQueries } from '../db/helpers.js';

const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const resend = new Resend(process.env.RESEND_KEY);

export async function getAllUsers(c: Context) {
  try {
    const users = await userQueries.findAll();

    return c.json({
      users,
    }, HttpStatusCodes.OK);
  } catch (error) {
    console.error('getAllUsers error:', error);
    return c.json({
      message: 'Internal Service Error',
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function registerUser(c: Context) {
  try {
    const { email, password } = await c.req.json();
    const saltedPassword = await bcrypt.hash(password, saltRounds);
    const result = await userQueries.create(email, saltedPassword);

    return c.json({
      message: 'User registered',
      id: result.id
    }, HttpStatusCodes.OK);
  } catch (error: any) {
    console.error('registerUser error:', error);

    if (error.code === 'P2002') {
      return c.json({
        message: 'Email already registered'
      }, HttpStatusCodes.CONFLICT);
    }

    return c.json({
      message: 'Internal Service Error',
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function loginUser(c: Context) {
  try {
    const { email, password } = await c.req.json();

    const user = await userQueries.findByEmail(email);
    
    if (!user) {
      return c.json({
        message: 'Invalid email or password'
      }, HttpStatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return c.json({
        message: 'Invalid email or password'
      }, HttpStatusCodes.UNAUTHORIZED);
    }

    const payload = {
      email,
      userId: user.id,
      exp: Math.floor(Date.now() / 1000) + 24 * 30 * 60 * 60
    };
    const secret = process.env.JWT_SECRET || '';
    const token = await sign(payload, secret);

    return c.json({
      message: 'Login successful',
      token: token,
    }, HttpStatusCodes.OK);

  } catch (error) {
    console.error('loginUser error:', error);
    return c.json({
      message: 'Internal Service Error'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function requestPasswordReset(c: Context) {
  try {
    const { email } = await c.req.json();
    const user = await userQueries.findByEmail(email);
    
    if (!user) {
      return c.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      }, HttpStatusCodes.OK);
    }

    const resetToken = crypto.randomUUID();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    const { data, error } = await resend.emails.send({
      from: 'Namaste <onboarding@resend.dev>',
      to: [email],
      subject: 'Namaste Password Reset',
      html: `<strong>Reset your password</strong><p>Token: ${resetToken}</p>`,
    });

    console.log({ data });

    return c.json({
      message: 'If an account with that email exists, a password reset link has been sent.'
    }, HttpStatusCodes.OK);
  } catch (error) {
    console.error('requestPasswordReset error:', error);
    return c.json({
      message: 'Internal Service Error'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// export async function resetPassword(c: Context) {
//     return c.json({
//       message: 'Reset Password Route'
//     }, HttpStatusCodes.OK);
// };

// export async function verifyEmail(c: Context) {
//      return c.json({
//       message: 'Verify Email'
//     }, HttpStatusCodes.OK); 
// };

