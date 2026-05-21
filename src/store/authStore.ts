// src/store/authStore.ts
// Global authentication state management using Zustand

import { create } from 'zustand';
import { Student, AuthResponse } from '@/types';

interface AuthStore {
  student: Student | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setStudent: (student: Student) => void;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  student: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setStudent: (student: Student) => set({ student, isAuthenticated: true }),

  setToken: (token: string) => set({ token }),

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: AuthResponse = await response.json();
      set({
        student: data.student,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('token', data.token);
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      student: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    localStorage.removeItem('token');
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),
}));
