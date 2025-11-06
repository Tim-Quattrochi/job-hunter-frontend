/**
 * Root Loading State
 *
 * Story 1.1: Provides Suspense boundary for pages using client-side hooks.
 * Required for Next.js build when pages use Stack Auth hooks.
 */

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
