/**
 * Stack Auth Server Configuration
 *
 * Story 1.1: Stack Auth integration for user registration and authentication.
 * This file initializes the Stack Auth server app for use in Server Components.
 */

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie", // Store JWT in httpOnly cookies for security
  urls: {
    // After successful sign-in, redirect to dashboard
    afterSignIn: "/dashboard",
    // After sign-out, redirect to home page
    afterSignOut: "/",
    // Custom sign-in page (using Stack's pre-built UI at /handler/signin)
    signIn: "/handler/signin",
  },
});
