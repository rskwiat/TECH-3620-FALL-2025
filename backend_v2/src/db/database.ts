import 'dotenv/config';
import Database from 'better-sqlite3';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { createUsersTable } from './seed.js';

const dataDir = join(process.cwd(), 'data');
mkdirSync(dataDir, { recursive: true });

const databaseFile = process.env.DATABASE_URL || 'test.db';
const dbPath = join(dataDir, databaseFile);

export const db = new Database(dbPath, {
  verbose: console.log
});

db.pragma('journal_mode = WAL');

export function initializeDatabase() {  
  db.exec(createUsersTable);
  console.log('Database initialized');
};

process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
