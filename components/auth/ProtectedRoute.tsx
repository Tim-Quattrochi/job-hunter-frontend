/**
 * Protected Route Component
 *
 * Story 1.1: Client-side component for protecting routes.
 * Shows loading state while checking authentication.
 * Redirects unauthenticated users to sign-in.
 */

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/handler/signin",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, stackUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to load
    if (isLoading) return;

    // Redirect if not authenticated
    if (!isAuthenticated || !stackUser) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, stackUser, router, redirectTo]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated || !stackUser) {
    return null;
  }

  // User is authenticated, show children
  return <>{children}</>;
}
