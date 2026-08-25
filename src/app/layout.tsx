import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Community | Connect, Verify, Build",
  description: "Your Web3 identity, community, and on-chain reputation — unified in one platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pb-20 md:pb-0">{children}</main>
          <Footer />
          <Toaster theme="dark" position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}