"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { awardPoints } from "./points";

export async function toggleFollow(targetUserId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  if (session.user.id === targetUserId) throw new Error("Cannot follow yourself");

  const existingFollow = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId: session.user.id, followingId: targetUserId } }
  });

  if (existingFollow) {
    await prisma.follow.delete({ where: { id: existingFollow.id } });
  } else {
    await prisma.$transaction([
      prisma.follow.create({ data: { followerId: session.user.id, followingId: targetUserId } }),
      prisma.notification.create({ data: { userId: targetUserId, type: "NEW_FOLLOWER", content: "You have a new follower!" } })
    ]);
    await awardPoints(session.user.id, 5, "Followed community member");
  }
  revalidatePath(`/users/${targetUserId}`);
}