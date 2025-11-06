/**
 * Dashboard Page
 *
 * Story 1.1: Protected dashboard page showing user profile.
 * Tests lazy profile creation - first visit creates profile with 10 free swipes.
 */

"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, stackUser, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !stackUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load profile</p>
        </div>
      </div>
    );
  }

  const totalSwipes = user.profile.free_swipes_remaining + user.profile.paid_credits;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              Welcome back, {stackUser.displayName || stackUser.primaryEmail || "User"}!
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Your Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Email</p>
              <p className="text-lg font-medium text-zinc-900 dark:text-white">
                {stackUser.primaryEmail || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">User ID</p>
              <p className="text-lg font-mono text-zinc-900 dark:text-white text-sm">
                {user.user_id}
              </p>
            </div>
          </div>
        </div>

        {/* Swipes Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Swipe Credits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Free Swipes
              </p>
              <p className="text-4xl font-bold text-blue-700 dark:text-blue-300 mt-2">
                {user.profile.free_swipes_remaining}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                Paid Credits
              </p>
              <p className="text-4xl font-bold text-green-700 dark:text-green-300 mt-2">
                {user.profile.paid_credits}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Total Swipes
              </p>
              <p className="text-4xl font-bold text-purple-700 dark:text-purple-300 mt-2">
                {totalSwipes}
              </p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-6 bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              <span className="font-medium">Profile Created:</span>{" "}
              {new Date(user.profile.created_at).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(user.profile.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
