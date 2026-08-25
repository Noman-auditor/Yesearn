"use client";
import { useAppKit } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { syncWalletToDatabase } from '@/actions/wallet';
import { toast } from 'sonner';

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      syncWalletToDatabase(address).then(() => {
        toast.success('Wallet connected successfully!');
      }).catch(err => toast.error(err.message));
    }
  }, [isConnected, address]);

  if (isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={() => open()} className="font-mono">
        <Wallet className="mr-2 h-4 w-4 text-green-400" />
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </Button>
    );
  }
  return (
    <Button size="sm" onClick={() => open()}>
      <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
    </Button>
  );
}