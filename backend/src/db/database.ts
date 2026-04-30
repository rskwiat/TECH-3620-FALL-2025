import 'dotenv/config';
import Database from 'better-sqlite3';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';

export const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

export const createJournalsTable = `
  CREATE TABLE IF NOT EXISTS journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL, 
    entry TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

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
  db.exec(createJournalsTable);
  console.log('Database initialized');
};

process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
