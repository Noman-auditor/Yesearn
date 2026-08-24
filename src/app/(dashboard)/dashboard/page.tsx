import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Twitter, Star, Users } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { wallets: true, accounts: true, badges: { include: { badge: true } } }
  });
  if (!user) redirect("/api/auth/signin");

  const hasX = user.accounts.some(a => a.type === "oauth");
  const wallet = user.wallets[0];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, @{user.username || "Anon"}</h1>
        <p className="text-gray-400">Level {user.level} · {user.points} XP</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{user.points.toLocaleString()}</div></CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">X Connection</CardTitle>
            <Twitter className={`h-4 w-4 ${hasX ? "text-blue-400" : "text-gray-600"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold flex items-center gap-2">
              {hasX ? "Connected" : "Not Connected"}
              {hasX && <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Wallet</CardTitle>
            <Wallet className={`h-4 w-4 ${wallet ? "text-green-400" : "text-gray-600"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold flex items-center gap-2">
              {wallet ? `${wallet.address.slice(0,6)}...${wallet.address.slice(-4)}` : "Not Connected"}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Badges</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{user.badges.length}</div></CardContent>
        </Card>
      </div>
    </div>
  );
}
