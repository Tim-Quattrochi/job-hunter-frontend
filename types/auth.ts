/**
 * Authentication Type Definitions
 *
 * Story 1.1: Types for user authentication and profile data.
 */

export interface UserProfile {
  user_id: string;
  free_swipes_remaining: number;
  paid_credits: number;
  created_at: string;
  updated_at: string;
}

export interface CurrentUser {
  user_id: string;
  email: string | null;
  profile: UserProfile;
}

export interface AuthState {
  user: CurrentUser | null;
  isLoading: boolean;
  error: string | null;
}
