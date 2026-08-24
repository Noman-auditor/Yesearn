"use client";
import { useAppKit } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { syncWalletToDatabase } from '@/actions/wallet';

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) syncWalletToDatabase(address);
  }, [isConnected, address]);

  if (isConnected) {
    return (
      <Button variant="outline" className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10" onClick={() => open()}>
        <Wallet className="mr-2 h-4 w-4 text-green-400" />
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </Button>
    );
  }
  return (
    <Button onClick={() => open()} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border border-white/10 shadow-lg shadow-blue-500/20">
      <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
    </Button>
  );
}
