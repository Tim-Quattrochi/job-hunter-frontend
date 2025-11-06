/**
 * Stack Auth Handler Route
 *
 * Story 1.1: This catch-all route handles all Stack Auth UI pages.
 * It automatically provides the following pages:
 * - /handler/signup - User registration
 * - /handler/signin - User login
 * - /handler/forgot-password - Password reset
 * - /handler/account-settings - Account management
 *
 * Stack Auth's pre-built UI (Option A from Story 1.1) handles:
 * - Email/password authentication
 * - OAuth (Google, LinkedIn)
 * - Email verification
 * - Password reset flows
 */

import type { ComponentProps } from "react";

import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";

type HandlerProps = ComponentProps<typeof StackHandler>;

export default function Handler(props: HandlerProps) {
  return <StackHandler {...props} app={stackServerApp} />;
}
