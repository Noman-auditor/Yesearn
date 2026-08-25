import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Twitter, Wallet, Star, Users } from "lucide-react";
import ConnectWalletButton from "@/components/web3/ConnectWalletButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 text-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8 text-sm text-gray-300">
          <Sparkles className="h-4 w-4 text-yellow-400" /> The Future of Web3 Identity
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Connect. Verify. <br/> Build Together.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Your Web3 identity, community, and on-chain reputation — unified in one premium platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/api/auth/signin">
            <Button size="lg" className="w-full sm:w-auto">
              <Twitter className="mr-2 h-5 w-5" /> Connect X
            </Button>
          </Link>
          <ConnectWalletButton />
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card p-6 text-left">
            <Twitter className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">X Authentication</h3>
            <p className="text-gray-400 text-sm">Secure OAuth 2.0 connection to bring your social identity on-chain.</p>
          </div>
          <div className="glass-card p-6 text-left">
            <Wallet className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Wallet Connection</h3>
            <p className="text-gray-400 text-sm">Connect your EVM wallet to verify assets and build reputation.</p>
          </div>
          <div className="glass-card p-6 text-left">
            <Star className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Points & Badges</h3>
            <p className="text-gray-400 text-sm">Earn points for legitimate activity and unlock premium Web3 badges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}