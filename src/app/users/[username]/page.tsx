import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toggleFollow } from "@/actions/community";
import { Star, Users } from "lucide-react";

export default async function PublicProfile({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  const targetUser = await prisma.user.findUnique({
    where: { username: params.username },
    include: { followers: true, following: true, badges: { include: { badge: true } } }
  });
  if (!targetUser) return notFound();
  const isFollowing = targetUser.followers.some(f => f.followerId === session?.user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-card p-8 flex flex-col md:flex-row items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold">
          {targetUser.displayName?.[0] || "U"}
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold">{targetUser.displayName}</h1>
          <p className="text-gray-400">@{targetUser.username}</p>
          <p className="mt-2 text-gray-300">{targetUser.bio}</p>
          <div className="flex gap-6 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {targetUser.followers.length} Followers</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {targetUser.following.length} Following</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400" /> {targetUser.points} Points</span>
          </div>
        </div>
        {session?.user?.id !== targetUser.id && (
          <form action={async () => { "use server"; await toggleFollow(targetUser.id); }}>
            <Button type="submit" variant={isFollowing ? "outline" : "default"} className="w-full">
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}