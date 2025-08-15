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
