import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      userId: null,
      isAuthenticated: false,
      login: (token, userId) =>
        set({
          accessToken: token,
          userId,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          userId: null,
          isAuthenticated: false,
        }),
    }),
    { name: 'auth-storage' }
  )
);
