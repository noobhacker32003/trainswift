import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      users: [],

      login: (email, password) => {
        const users = get().users;
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          set({ user: { ...user, password: undefined }, isLoggedIn: true });
          return true;
        }
        return false;
      },

      signup: (name, email, password) => {
        const users = get().users;
        const userExists = users.find((u) => u.email === email);

        if (userExists) {
          return false;
        }

        const newUser = { id: Date.now().toString(), name, email, password };
        set({
          users: [...users, newUser],
          user: { ...newUser, password: undefined },
          isLoggedIn: true,
        });
        return true;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'trainswift-auth',
    }
  )
);
