"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ConnectWalletButton from "@/components/web3/ConnectWalletButton";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-5 w-5 text-purple-400" /> Web3Community
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/community" className="hover:text-white transition-colors">Community</Link>
          <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
        </div>
        <div className="flex items-center gap-2">
          <ConnectWalletButton />
          {session ? (
            <Link href="/dashboard"><Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Dashboard</Button></Link>
          ) : (
            <Link href="/api/auth/signin"><Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">Sign in</Button></Link>
          )}
        </div>
      </nav>
    </header>
  );
}
