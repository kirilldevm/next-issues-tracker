'use server';

import { signIn } from '@/auth';
import { PAGES } from '@/configs/pages.config';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import {
  loginSchema,
  registerSchema,
  TLoginSchema,
  TRegisterSchema,
} from './../schemas/auth.schema';

export async function signInAction(data: TLoginSchema) {
  const validatedValues = loginSchema.safeParse(data);

  if (!validatedValues.success) {
    return {
      error: validatedValues.error,
    };
  }

  const { email, password } = validatedValues.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.hashedPassword) {
    return {
      error: 'Invalid credentials',
    };
  }

  const compare = await bcrypt.compare(password, user.hashedPassword);

  if (!compare) {
    return {
      error: 'Invalid credentials',
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

  if (passwordsMatch) {
    await signIn('credentials', {
      email,
      password,
      redirectTo: PAGES.HOME,
    });
  }
}

export async function signUpAction(data: TRegisterSchema) {
  const validatedValues = registerSchema.safeParse(data);

  if (!validatedValues.success) {
    return {
      error: validatedValues.error,
    };
  }

  const { name, email, password } = validatedValues.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: 'User already exists',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  if (!user) {
    return {
      error: 'Failed to create user',
    };
  }

  await signIn('credentials', {
    email,
    password,
    redirectTo: PAGES.HOME,
  });
}
