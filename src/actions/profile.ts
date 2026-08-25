"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
  displayName: z.string().min(2).max(50),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  bio: z.string().max(160).optional(),
});

export async function updateProfile(values: z.infer<typeof ProfileSchema>) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validatedFields = ProfileSchema.safeParse(values);
  if (!validatedFields.success) throw new Error("Invalid fields");

  const { displayName, username, bio } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser && existingUser.id !== session.user.id) {
    throw new Error("Username already taken");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { displayName, username, bio },
  });

  revalidatePath("/settings");
  revalidatePath("/profile");
}