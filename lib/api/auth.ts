/**
 * Auth API Client
 *
 * Story 1.1: Client for calling backend auth endpoints.
 * Handles JWT token management and API requests.
 */

import { CurrentUser } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Get the current user's profile from the backend.
 *
 * This endpoint implements lazy profile creation:
 * - If the profile doesn't exist, it will be created with 10 free swipes
 * - Requires a valid JWT token from Stack Auth
 *
 * @param accessToken - JWT access token from Stack Auth
 * @returns Current user data including profile
 * @throws Error if API request fails
 */
export async function getCurrentUser(accessToken: string): Promise<CurrentUser> {
  const response = await fetch(`${API_BASE_URL}/api/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch current user: ${error}`);
  }

  return response.json();
}

/**
 * Get a user's profile by ID.
 *
 * @param userId - The user ID to fetch
 * @param accessToken - JWT access token
 * @returns User profile data
 * @throws Error if API request fails
 */
export async function getUserProfile(userId: string, accessToken: string) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch user profile: ${error}`);
  }

  return response.json();
}
