/**
 * Auth State Management with Zustand
 *
 * Story 1.1: Global authentication state management.
 * Combines Stack Auth user data with backend profile data.
 */

import { create } from "zustand";

import { getCurrentUser } from "@/lib/api/auth";
import { AUTH_TEST_MODE } from "@/lib/env";
import { getMockCurrentUser } from "@/lib/testing/mock-auth-api";
import { CurrentUser } from "@/types/auth";

interface AuthStore {
  user: CurrentUser | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: CurrentUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchUser: (accessToken: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  fetchUser: async (accessToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await (AUTH_TEST_MODE
        ? getMockCurrentUser(accessToken)
        : getCurrentUser(accessToken));
      set({ user, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user";
      set({ error: errorMessage, isLoading: false, user: null });
    }
  },

  logout: () => {
    set({ user: null, isLoading: false, error: null });
  },
}));
