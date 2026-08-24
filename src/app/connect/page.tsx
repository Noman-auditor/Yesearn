"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ConnectWalletButton from "@/components/web3/ConnectWalletButton";
import { Twitter, Wallet, CheckCircle2 } from "lucide-react";

export default function ConnectPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Connection Center</h1>
      
      <div className="space-y-6">
        {/* X Card */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Twitter className={`h-10 w-10 ${session ? "text-blue-400" : "text-gray-500"}`} />
            <div>
              <h3 className="font-bold text-lg">X (Twitter)</h3>
              <p className="text-sm text-gray-400">
                {session ? `Connected as @${session.user.username}` : "Not Connected"}
              </p>
            </div>
          </div>
          {session ? (
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          ) : (
            <Link href="/api/auth/signin">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">Connect X</Button>
            </Link>
          )}
        </div>

        {/* Wallet Card */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Wallet className="h-10 w-10 text-gray-500" />
            <div>
              <h3 className="font-bold text-lg">Ethereum Wallet</h3>
              <p className="text-sm text-gray-400">Connect your EVM wallet</p>
            </div>
          </div>
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
}
