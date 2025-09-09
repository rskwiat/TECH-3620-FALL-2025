import 'dotenv/config';
import type { Context } from 'hono';
import * as HttpStatusCodes from '../constants/status-codes.js';
import { db } from '../db/database.js';
import { journalQueries, userQueries } from '../db/helpers.js';

export async function getUserJournals(c: Context) {
  try {
    const userId = c.get('userId');
    // const user = userQueries.findByEmail(userId);

    // const journals = db.prepare(`
    //   SELECT id, entry, created_at
    //   FROM journals,
    //   WHERE user_id = ?
    //   ORDER BY created_at DESC
    // `).all(user?.id);

    // console.log(user);

    return c.json({
      success: true,
      id: userId,
    }, HttpStatusCodes.OK);
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch journals.'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

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

    const result = journalQueries.create(userId, title, entry);

    return c.json({
      success: true,
      message: 'Journal entry created successfully',
      journalId: result.lastInsertRowid
    }, HttpStatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    return c.json({
      success: false,
      error: 'Failed to create new entry.'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
