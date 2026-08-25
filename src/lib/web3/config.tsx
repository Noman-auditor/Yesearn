"use client";
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, polygon } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const networks = [mainnet, polygon];

const wagmiAdapter = new WagmiAdapter({ networks, projectId, ssr: true });

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  features: { analytics: true }
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <wagmiAdapter.wagmiConfigProvider>{children}</wagmiAdapter.wagmiConfigProvider>
    </QueryClientProvider>
  );
}