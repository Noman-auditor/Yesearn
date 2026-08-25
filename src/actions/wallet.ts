"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { awardPoints, checkAndAwardBadges } from "./points";

export async function syncWalletToDatabase(address: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthenticated");
  
  const normalizedAddress = address.toLowerCase();
  const existingWallet = await prisma.wallet.findUnique({ where: { address: normalizedAddress } });

  if (existingWallet && existingWallet.userId !== session.user.id) {
    throw new Error("Wallet already linked to another account");
  }

  if (!existingWallet) {
    await awardPoints(session.user.id, 100, "Connected Ethereum Wallet");
  }

  await prisma.wallet.upsert({
    where: { address: normalizedAddress },
    update: { userId: session.user.id },
    create: { address: normalizedAddress, userId: session.user.id, network: "Ethereum" },
  });

  await checkAndAwardBadges(session.user.id);
}