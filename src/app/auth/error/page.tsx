import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="glass-card p-8 rounded-2xl max-w-md space-y-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold">Authentication Failed</h1>
        <p className="text-gray-400">There was an error connecting your X account. Please try again.</p>
        <Link href="/api/auth/signin"><Button className="w-full">Retry Connection</Button></Link>
      </div>
    </div>
  );
}