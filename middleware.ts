/**
 * Next.js Middleware for Protected Routes
 *
 * Story 1.1: Server-side route protection.
 * Redirects unauthenticated users to sign-in page.
 */

import { stackServerApp } from "@/lib/stack";
import { StackMiddleware } from "@stackframe/stack/dist/middleware";

export const middleware = StackMiddleware({
  app: stackServerApp,
});

/**
 * Match all routes except:
 * - API routes
 * - Static files (_next/static)
 * - Image optimization files (_next/image)
 * - Favicon
 * - Public routes (/, /handler/*)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (home page - public)
     * - /handler/* (auth pages - public)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|handler).*)",
  ],
};
