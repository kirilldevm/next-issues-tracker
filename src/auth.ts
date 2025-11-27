import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { FixedPrismaAdapter } from './lib/auth-prisma-adapter';
import { getAccountById, getUserById } from './lib/db/user';
import { prisma } from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: FixedPrismaAdapter(prisma),
  pages: { signIn: '/signin', error: '/signin' },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser) return false;

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountById(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.noPassword = !existingUser.hashedPassword;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth!;
        session.user.noPassword = token.noPassword!;
      }

      return session;
    },
  },
});
