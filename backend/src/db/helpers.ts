import { getPrisma } from './prisma.js';

export const userQueries = {
  findByEmail: async (email: string) => {
    return await getPrisma().user.findUnique({
      where: { email }
    });
  },
  
  create: async (email: string, password: string) => {
    return await getPrisma().user.create({
      data: { email, password }
    });
  },
  
  findById: async (id: number) => {
    return await getPrisma().user.findUnique({
      where: { id }
    });
  },

  findAll: async () => {
    return await getPrisma().user.findMany();
  }

};

export const journalQueries = {
  create: async (userId: number, title: string, entry: string) => {
    return await getPrisma().journal.create({
      data: {
        userId,
        title,
        entry
      }
    });
  },

  findByUserId: async (userId: number) => {
    return await getPrisma().journal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  },

  findById: async (id: number) => {
    return await getPrisma().journal.findUnique({
      where: { id }
    });
  }
};
