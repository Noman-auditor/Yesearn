import { Sparkles, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">About Web3 Community</h1>
      <p className="text-xl text-gray-400 mb-12">A Web3-focused community platform designed to connect people, identities, and on-chain reputation.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-6">
          <Sparkles className="h-8 w-8 text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Who We Are</h2>
          <p className="text-gray-400 text-sm">We are building a unified identity layer for Web3, moving beyond fragmented profiles.</p>
        </div>
        <div className="glass-card p-6">
          <ShieldCheck className="h-8 w-8 text-green-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Why This Platform</h2>
          <p className="text-gray-400 text-sm">Instead of managing different Web3 identities separately, connect your social and wallet here.</p>
        </div>
        <div className="glass-card p-6">
          <Users className="h-8 w-8 text-blue-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Future Vision</h2>
          <p className="text-gray-400 text-sm">To become the standard for on-chain reputation, NFT verification, and community access.</p>
        </div>
      </div>
    </div>
  );
}