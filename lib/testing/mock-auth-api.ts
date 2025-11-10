import { getMockAuthUser } from "@/lib/testing/mock-auth-state";
import { CurrentUser } from "@/types/auth";

/**
 * Fake backend response generator for auth test mode.
 */
export async function getMockCurrentUser(
  accessToken: string,
): Promise<CurrentUser> {
  const session = getMockAuthUser();

  if (!session || session.accessToken !== accessToken) {
    throw new Error("Mock auth session not found");
  }

  return {
    user_id: session.user_id,
    email: session.email,
    profile: {
      user_id: session.user_id,
      free_swipes_remaining: 10,
      paid_credits: 0,
      created_at: session.created_at,
      updated_at: session.updated_at,
    },
  };
}
