import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default async function CommunityPage() {
  const users = await prisma.user.findMany({
    orderBy: { points: "desc" },
    take: 20
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community Members</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Link href={`/users/${user.username}`} key={user.id}>
            <Card className="glass-card border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-bold">
                  {user.displayName?.[0] || "U"}
                </div>
                <div>
                  <h3 className="font-semibold">{user.displayName || "Anonymous"}</h3>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-yellow-400 font-bold">
                  <Star className="h-4 w-4" /> {user.points}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
