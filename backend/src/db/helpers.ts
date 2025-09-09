import { db } from './database.js';
import type { User } from '../types.js';

export const userQueries = {
  findByEmail: (email: string): User | undefined => {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User | undefined;
  },
  
  create: (email: string, password: string) => {
    return db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, password);
  },
  
  findById: (id: number): User | undefined => {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
  }
};

export const journalQueries = {
  create: (userId: number, title: string, entry: string) => {
    return db.prepare(
      "INSERT INTO journals (user_id, title, entry) VALUES (?, ?, ?)"
    ).run(userId, title, entry);
  },

  findByUserId: (userId: number) => {
    return db.prepare(
      "SELECT id, title, entry, created_at FROM journals WHERE user_id = ? ORDER BY created_at DESC"
    ).all(userId);
  },

  findById: (id: number) => {
    return db.prepare(
      "SELECT id, user_id, title, entry, created_at FROM journals WHERE id = ?"
    ).get(id);
  }
};
