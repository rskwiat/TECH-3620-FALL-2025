import { create } from 'zustand';

export const useAppStore = create((set) => ({
  user: null,
  theme: 'light',
  setMessage: (message) => set({ message }),
  setTheme: (theme) => set({ theme }),
  registerUser: async (email, password) => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (response.ok) {
        set({ user: result.token })
      } else {
        set({ message: result.message });
      }
    } catch (error) {
      console.error(error);
      set({ message: 'An unexpected error occurred.' });
    }
  },
  loginUser: async (email, password) => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/login' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      if (response.ok) {
        set({ user: result.token })
      } else {
        set({ message: result.message });
      }

    } catch (error) {
      console.error(error);
      set({ message: 'An unexpected error occurred.' });
    }
  },
  logoutUser: () => set({ user: null })
}));