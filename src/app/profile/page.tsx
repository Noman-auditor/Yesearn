import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Award } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { 
      followers: true, 
      following: true, 
      badges: { include: { badge: true } },
      wallets: true
    }
  });

  if (!user) return redirect("/api/auth/signin");

  // Profile Completion Logic
  let completion = 0;
  if (user.displayName) completion += 25;
  if (user.username) completion += 25;
  if (user.bio) completion += 25;
  if (user.wallets.length > 0) completion += 25;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-card p-8 mb-8 flex flex-col md:flex-row items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold">
          {user.displayName?.[0] || "U"}
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold">{user.displayName || "Anonymous"}</h1>
          <p className="text-gray-400">@{user.username}</p>
          <p className="mt-2 text-gray-300">{user.bio || "No bio added yet."}</p>
          
          <div className="mt-4 w-full bg-white/10 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${completion}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Profile {completion}% complete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader><CardTitle className="flex items-center gap-2"><Star className="text-yellow-400" /> Points</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{user.points}</CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="text-blue-400" /> Followers</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{user.followers.length}</CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="text-purple-400" /> Badges</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{user.badges.length}</CardContent>
        </Card>
      </div>
    </div>
  );
}
