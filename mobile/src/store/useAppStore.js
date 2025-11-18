import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  user: null,
  theme: 'light',
  setMessage: (message) => set({ message }),
  setTheme: (theme) => set({ theme }),
  //all user methods
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
        set({ 
          user: { 
            token: result.token, 
            email: result.email
          } 
        });
        //should return a status code of 200 and a token if successful, otherwise return an error message
        return result.token;
      } else {
        set({ message: result.message });
        return result.message;
      }

    } catch (error) {
      console.error(error);
      set({ message: 'An unexpected error occurred.' });
      return error.message;
    }
  },
  logoutUser: () => set({ user: null }),
  //all journal methods
  getJournals: async () => {
    try {
      const currentUser = get().user;
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/journals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      const results = await response.json();
      set({ 
        user: {
          ...currentUser,
          journals: results.data || [],
        } 
      });
      return results.data;
    } catch (error) {
      set({ message: 'An unexpected error occured.'});
      return error.message;
    }
  },
  createJournals: async (title, entry) => {

  },
}));