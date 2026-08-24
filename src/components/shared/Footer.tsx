import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span>© 2024 Web3Community. All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-white">Twitter</Link>
        </div>
      </div>
    </footer>
  );
}
