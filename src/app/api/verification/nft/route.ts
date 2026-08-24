import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { erc721Abi } from 'viem';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { contractAddress, tokenId } = await req.json();
    const userWallet = await prisma.wallet.findFirst({ where: { userId: session.user.id } });

    if (!userWallet) return NextResponse.json({ error: "No wallet connected" }, { status: 400 });

    const client = createPublicClient({ chain: mainnet, transport: http(process.env.ALCHEMY_RPC_URL) });

    // Real on-chain verification
    const owner = await client.readContract({
      address: contractAddress,
      abi: erc721Abi,
      functionName: 'ownerOf',
      args: [tokenId]
    });

    if (owner.toLowerCase() === userWallet.address.toLowerCase()) {
      await prisma.wallet.update({
        where: { id: userWallet.id },
        data: { verifiedAt: new Date() }
      });
      return NextResponse.json({ success: true, message: "NFT Verified Successfully" });
    } else {
      return NextResponse.json({ error: "Ownership verification failed" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
