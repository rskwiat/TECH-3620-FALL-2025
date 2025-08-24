import { create } from 'zustand';

export const useAppStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => ({ user }),
  setTheme: (theme) => set({ theme })
}));