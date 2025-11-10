/**
 * useAuth Hook
 *
 * Story 1.1: Custom hook that combines Stack Auth with backend profile data.
 * This hook automatically fetches the user's profile from the backend when they sign in.
 */

"use client";

import { useEffect } from "react";

import { useStackUser } from "@/hooks/useStackUser";
import { useAuthStore } from "@/store/auth";

export function useAuth() {
  const stackUser = useStackUser();
  const { user, isLoading, error, fetchUser, logout } = useAuthStore();

  // Fetch backend profile when Stack Auth user is available
  useEffect(() => {
    const loadUserProfile = async () => {
      if (stackUser && !user && !isLoading) {
        try {
          // Get access token from Stack Auth
          const accessToken = await stackUser
            .getAuthJson()
            .then((auth) => auth.accessToken);

          if (accessToken) {
            await fetchUser(accessToken);
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
        }
      }

      // Clear user when logged out
      if (!stackUser && user) {
        logout();
      }
    };

    loadUserProfile();
  }, [stackUser, user, isLoading, fetchUser, logout]);

  return {
    // Stack Auth user (contains email, ID, etc.)
    stackUser,
    // Backend user (contains profile with swipes/credits)
    user,
    // Combined loading state
    isLoading: isLoading || stackUser === undefined,
    // Error state
    error,
    // Is user authenticated?
    isAuthenticated: !!stackUser && !!user,
    // Sign out function
    signOut: async () => {
      await stackUser?.signOut?.();
      logout();
    },
  };
}
