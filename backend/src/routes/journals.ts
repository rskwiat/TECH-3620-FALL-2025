import 'dotenv/config';
import type { Context } from 'hono';
import * as HttpStatusCodes from '../constants/status-codes.js';
import { journalQueries, userQueries } from '../db/helpers.js';

export async function getUserJournals(c: Context) {
  try {
    const userId = c.get('userId');
    
    const journals = await journalQueries.findByUserId(userId);

    return c.json({
      success: true,
      journals,
    }, HttpStatusCodes.OK);
  } catch (error) {
    console.error('getUserJournals error:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch journals.'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

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

    return c.json({
      success: true,
      message: 'Journal entry created successfully',
      journalId: result.id
    }, HttpStatusCodes.CREATED);
  } catch (error) {
    console.error('createUserJournal error:', error);
    return c.json({
      success: false,
      error: 'Failed to create new entry.'
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}
