import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from './constants';

interface User {
  id: number;
  email: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user }),

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    if (token) {
      try {
        SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
      } catch (error) {
        console.error('Failed to store token:', error);
      }
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    try {
      SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Failed to clear token:', error);
    }
  },

  initializeAuth: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      if (storedToken) {
        set({ token: storedToken, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Failed to retrieve stored token:', error);
    }
  },
}));
