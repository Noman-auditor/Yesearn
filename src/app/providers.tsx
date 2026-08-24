"use client";
import { SessionProvider } from "next-auth/react";
import { Web3Provider } from "@/lib/web3/config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Web3Provider>{children}</Web3Provider>
    </SessionProvider>
  );
}
