import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { getUserByEmail } from './lib/db/user';
import { loginSchema } from './schemas';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        const validatedValues = loginSchema.safeParse(credentials);
        if (!validatedValues.success) return null;

        const { email, password } = validatedValues.data;

        const user = await getUserByEmail(email);
        if (!user || !user.hashedPassword) return null;

        const ok = await bcrypt.compare(password, user.hashedPassword);
        if (!ok) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
