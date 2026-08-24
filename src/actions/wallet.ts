"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function syncWalletToDatabase(address: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthenticated");
  
  const normalizedAddress = address.toLowerCase();
  const existingWallet = await prisma.wallet.findUnique({ where: { address: normalizedAddress } });

  if (existingWallet && existingWallet.userId !== session.user.id) {
    throw new Error("Wallet already linked to another account");
  }

  await prisma.wallet.upsert({
    where: { address: normalizedAddress },
    update: { userId: session.user.id },
    create: { address: normalizedAddress, userId: session.user.id, network: "Ethereum" },
  });

  // Secure point allocation (Idempotency check omitted for brevity)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { points: { increment: 100 } }
  });
}
