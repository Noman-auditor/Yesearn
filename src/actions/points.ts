"use server";
import { prisma } from "@/lib/prisma";

export async function awardPoints(userId: string, amount: number, reason: string) {
  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { points: { increment: amount } } }),
    prisma.pointTransaction.create({ data: { userId, amount, reason } })
  ]);
}

export async function checkAndAwardBadges(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { accounts: true, wallets: true, badges: true }
  });
  if (!user) return;

  const hasX = user.accounts.some(a => a.type === "oauth");
  const hasWallet = user.wallets.length > 0;

  if (hasX && hasWallet) {
    const badgeExists = user.badges.some(b => b.badge.type === "CONNECTED");
    if (!badgeExists) {
      const badge = await prisma.badge.findUnique({ where: { type: "CONNECTED" } });
      if (badge) {
        await prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
        await prisma.notification.create({ data: { userId, type: "BADGE_EARNED", content: "You unlocked the 'Connected' badge!" } });
      }
    }
  }
}