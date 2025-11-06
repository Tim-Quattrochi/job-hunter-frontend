/**
 * Home Page
 *
 * Story 1.1: Landing page with authentication options.
 */

"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated, stackUser, isLoading } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-black">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-white">
            Job Hunter
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Find your dream job with Job Hunter
          </p>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          ) : isAuthenticated && stackUser ? (
            <div className="space-y-4">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                Welcome back, {stackUser.primaryEmail || "User"}!
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/handler/signup">
                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  Sign Up
                </Button>
              </Link>
              <Link href="/handler/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
