/**
 * Next.js Proxy for Protected Routes
 *
 * Story 1.1: Server-side route protection leveraging Stack Auth.
 * Replaces the deprecated middleware.ts with the Next.js 16 proxy helper.
 */

import { NextResponse, type NextRequest } from "next/server";

import { AUTH_TEST_MODE } from "@/lib/env";
import { stackServerApp } from "@/lib/stack";

const SIGN_IN_PATH = "/handler/signin";

/**
 * Determine whether a pathname should bypass authentication.
 * Public routes are kept minimal (marketing landing page, auth handlers).
 */
const isPublicPath = (pathname: string): boolean =>
  pathname === "/" || pathname.startsWith("/handler");

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_TEST_MODE) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const user = await stackServerApp.getUser({
    or: "return-null",
    tokenStore: request,
  });

  if (!user) {
    const signInUrl = new URL(SIGN_IN_PATH, request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

/**
 * Match all routes except:
 * - API routes
 * - Static assets (_next/static, _next/image)
 * - Favicon
 * - Stack Auth handler routes
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|handler).*)",
  ],
};
