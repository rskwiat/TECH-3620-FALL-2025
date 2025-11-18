import 'dotenv/config';
import type { Context } from 'hono';
import * as HttpStatusCodes from '../constants/status-codes.js';
import { db } from '../db/database.js';
import { journalQueries, userQueries } from '../db/helpers.js';

export async function getUserJournals(c: Context) {
  try {
    const userId = c.get('userId');
    const journals = await journalQueries.findByUserId(userId);
    return c.json({
      success: true,
      id: userId,
      data: journals,
    }, HttpStatusCodes.OK);
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch journals.'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};


//@todo -- rate limiting
export async function createUserJournal(c: Context) {
  try {
    const userId = c.get('userId');
    const { entry, title } = await c.req.json();

    if (!entry || !title) {
      return c.json({
        success: false,
        error: 'Entry and title are required.'
      }, HttpStatusCodes.BAD_REQUEST);
    }

    const result = await journalQueries.create(userId, title, entry);
    const journals = await journalQueries.findByUserId(userId);

    return c.json({
      success: true,
      message: 'Journal entry created successfully',
      journalId: result.lastInsertRowid,
      data: journals,
    }, HttpStatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    return c.json({
      success: false,
      error: 'Failed to create new entry.'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
