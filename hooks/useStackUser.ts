"use client";

import { useUser as useStackframeUser } from "@stackframe/stack";

import { MockStackUser, useMockStackUser } from "@/components/testing/MockStackProvider";
import { AUTH_TEST_MODE } from "@/lib/env";

export type StackUser = ReturnType<typeof useStackframeUser> | MockStackUser | null;

const stackUserHook = AUTH_TEST_MODE ? useMockStackUser : useStackframeUser;

export function useStackUser(): StackUser {
  return stackUserHook();
}
