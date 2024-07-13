import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@playground/ui";
import { ThemeProvider, ThemeToggle } from "@playground/ui/theme";
import { Toaster } from "@playground/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

const appName = "BelovedOne";
const title = "BelovedOne - Achieve the impossible with your love";
const description =
  "Together manage your time, money, and tasks by keeping each other accountable & excited";
const url = "https://yourbeloved.one";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production" ? url : "http://localhost:3000",
  ),
  title,
  description,
  openGraph: { title, description, url, siteName: appName },
  twitter: {
    card: "summary_large_image",
    site: "@yourbeloved_one",
    creator: "@yourbeloved_one",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
