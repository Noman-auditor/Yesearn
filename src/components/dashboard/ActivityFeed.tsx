import { prisma } from "@/lib/prisma";
import { Activity, Twitter, Wallet, UserPlus, Award } from "lucide-react";
import { timeAgo } from "@/lib/utils";

export default async function ActivityFeed({ userId }: { userId: string }) {
  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const getIcon = (type: string) => {
    if (type === "X_CONNECTED") return <Twitter className="h-4 w-4 text-blue-400" />;
    if (type === "WALLET_CONNECTED") return <Wallet className="h-4 w-4 text-green-400" />;
    if (type === "FOLLOWED_USER") return <UserPlus className="h-4 w-4 text-purple-400" />;
    if (type === "BADGE_EARNED") return <Award className="h-4 w-4 text-yellow-400" />;
    return <Activity className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="glass-card p-6 mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity.</p>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="flex items-center gap-4 text-sm border-b border-white/5 pb-3">
              {getIcon(act.type)}
              <span className="text-gray-300 flex-grow capitalize">{act.type.replace(/_/g, ' ').toLowerCase()}</span>
              <span className="text-gray-500 text-xs">{timeAgo(act.createdAt)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}