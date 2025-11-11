import 'dotenv/config';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import bcrypt from 'bcrypt';
import { Resend } from 'resend';
import crypto from 'node:crypto';

import * as HttpStatusCodes from '../constants/status-codes.js'
import { userQueries } from '../db/helpers.js';

const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const resend = new Resend(process.env.RESEND_KEY);

export async function registerUser(c: Context) {
  try {
    const { email, password } = await c.req.json();
    const saltedPassword = await bcrypt.hash(password, salt);
    const result = userQueries.create(email, saltedPassword);

    return c.json({
      message: 'User registered',
      id: result.lastInsertRowid
    }, 200);
  } catch (error: any) {

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

export async function loginUser(c: Context) {
  try {
    const { email, password } = await c.req.json();

    const user = userQueries.findByEmail(email);
    
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
      exp: Math.floor(Date.now() / 1000) + 24 * 30
    };
    const secret = process.env.JWT_SECRET || '';
    const token = await sign(payload, secret);

    return c.json({
      message: 'Login successful',
      token: token,
      email: user.email,
    }, HttpStatusCodes.OK);

  } catch (error) {
    return c.json({
      message: 'Internal Service Error'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function requestPasswordReset(c: Context) {
  try {
    const { email } = await c.req.json();
    const user = userQueries.findByEmail(email);
    
    if (!user) {
      return c.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      }, HttpStatusCodes.OK);
    }

    const resetToken = crypto.randomUUID();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now


    const { data, error } = await resend.emails.send({
      from: 'Namaste <onboarding@resend.dev>',
      to: ['YOUR_EMAIL_ADDRESS@EMAIL.com'],
      subject: 'Namaste Password Reset',
      html: '<strong>It works!</strong>',
    });

    console.log({ data });

    return c.json({
      message: 'If an account with that email exists, a password reset link has been sent.'
    }, HttpStatusCodes.OK);
  } catch (error) {
    return c.json({
      message: 'Internal Service Error'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export async function resetPassword(c: Context) {
    return c.json({
      message: 'Reset Password Route'
    }, HttpStatusCodes.OK);
};

export async function verifyEmail(c: Context) {
     return c.json({
      message: 'Verify Email'
    }, HttpStatusCodes.OK); 
};

