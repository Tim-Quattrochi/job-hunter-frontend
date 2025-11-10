/**
 * Minimal shared state for mock authentication mode used in E2E tests.
 */

export interface MockAuthUserData {
  user_id: string;
  email: string;
  displayName?: string;
  accessToken: string;
  created_at: string;
  updated_at: string;
}

let currentUser: MockAuthUserData | null = null;

export function setMockAuthUser(user: MockAuthUserData | null) {
  currentUser = user;
}

export function getMockAuthUser(): MockAuthUserData | null {
  return currentUser;
}
