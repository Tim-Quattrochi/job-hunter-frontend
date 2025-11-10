"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import {
  type MockAuthUserData,
  setMockAuthUser,
} from "@/lib/testing/mock-auth-state";

export interface MockStackUser {
  id: string;
  primaryEmail: string;
  displayName?: string;
  getAuthJson: () => Promise<{ accessToken: string }>;
  signOut: () => Promise<void>;
}

export interface MockRegistrationInput {
  email: string;
  password: string;
  name?: string;
}

interface MockAuthContextValue {
  user: MockStackUser | null;
  register: (input: MockRegistrationInput) => Promise<void>;
  signOut: () => Promise<void>;
}

const MockAuthContext = createContext<MockAuthContextValue | undefined>(
  undefined,
);

const randomId = (prefix: string) =>
  `${prefix}-${
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
  }`;

function createStackUser(
  data: MockAuthUserData,
  onSignOut: () => Promise<void>,
): MockStackUser {
  return {
    id: data.user_id,
    primaryEmail: data.email,
    displayName: data.displayName,
    async getAuthJson() {
      return { accessToken: data.accessToken };
    },
    async signOut() {
      await onSignOut();
    },
  };
}

export function MockStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<MockStackUser | null>(null);

  const handleSignOut = useCallback(async () => {
    setMockAuthUser(null);
    setUser(null);
  }, []);

  const register = useCallback(
    async ({ email, name }: MockRegistrationInput) => {
      const now = new Date().toISOString();
      const userData: MockAuthUserData = {
        user_id: randomId("mock-user"),
        email,
        displayName: name || email.split("@")[0],
        accessToken: randomId("mock-token"),
        created_at: now,
        updated_at: now,
      };

      setMockAuthUser(userData);
      setUser(createStackUser(userData, handleSignOut));
    },
    [handleSignOut],
  );

  const value = useMemo<MockAuthContextValue>(
    () => ({
      user,
      register,
      signOut: handleSignOut,
    }),
    [handleSignOut, register, user],
  );

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockStackUser(): MockStackUser | null {
  const context = useContext(MockAuthContext);

  if (!context) {
    throw new Error("useMockStackUser must be used within MockStackProvider");
  }

  return context.user;
}

export function useMockAuthActions() {
  const context = useContext(MockAuthContext);

  if (!context) {
    throw new Error("useMockAuthActions must be used within MockStackProvider");
  }

  return {
    register: context.register,
    signOut: context.signOut,
  };
}
