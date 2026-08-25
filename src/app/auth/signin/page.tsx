"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="glass-card p-8 rounded-2xl max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold">Welcome to Web3Community</h1>
        <p className="text-gray-400">Connect your X account to join the community and build your reputation.</p>
        <Button onClick={() => signIn("twitter", { callbackUrl: "/dashboard" })} className="w-full">
          <Twitter className="mr-2 h-5 w-5" /> Connect with X
        </Button>
      </div>
    </div>
  );
}