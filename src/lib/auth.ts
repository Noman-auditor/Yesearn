import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import TwitterProvider from "next-auth/providers/twitter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.X_CLIENT_ID as string,
      clientSecret: process.env.X_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { points: true, level: true, username: true, displayName: true }
        });
        if (dbUser) {
          session.user.points = dbUser.points;
          session.user.level = dbUser.level;
          session.user.username = dbUser.username;
          session.user.displayName = dbUser.displayName;
        }
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
export default NextAuth(authOptions);