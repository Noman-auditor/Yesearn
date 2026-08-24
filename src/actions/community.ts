"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
    // Secure transaction: Follow + Award Points + Record Activity
    await prisma.$transaction([
      prisma.follow.create({ data: { followerId: session.user.id, followingId: targetUserId } }),
      prisma.user.update({ where: { id: session.user.id }, data: { points: { increment: 5 } } }),
      prisma.pointTransaction.create({ data: { userId: session.user.id, amount: 5, reason: "Followed community member" } })
    ]);
  }
  revalidatePath(`/users/${targetUserId}`);
}
