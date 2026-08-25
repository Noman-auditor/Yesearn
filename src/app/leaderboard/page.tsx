import { prisma } from "@/lib/prisma";
import { Crown } from "lucide-react";

export default async function LeaderboardPage() {
  const topUsers = await prisma.user.findMany({ orderBy: { points: "desc" }, take: 10 });
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Crown className="text-yellow-400" /> Leaderboard</h1>
      <div className="space-y-3">
        {topUsers.map((user, index) => (
          <div key={user.id} className="glass-card p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className={`text-xl font-bold w-8 ${index === 0 ? 'text-yellow-400' : 'text-gray-500'}`}>#{index + 1}</span>
              <div>
                <h3 className="font-semibold">{user.displayName || "Anonymous"}</h3>
                <p className="text-sm text-gray-400">@{user.username || "user"}</p>
              </div>
            </div>
            <div className="text-lg font-bold text-yellow-400">{user.points.toLocaleString()} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}