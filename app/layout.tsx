import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider } from "@stackframe/stack";

import { MockStackProvider } from "@/components/testing/MockStackProvider";
import { AUTH_TEST_MODE } from "@/lib/env";
import { stackServerApp } from "@/lib/stack";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Hunter",
  description: "Find your dream job with Job Hunter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {AUTH_TEST_MODE ? (
          <MockStackProvider>{children}</MockStackProvider>
        ) : (
          <StackProvider app={stackServerApp}>{children}</StackProvider>
        )}
      </body>
    </html>
  );
}
