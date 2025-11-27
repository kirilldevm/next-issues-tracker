import { PrismaAdapter } from '@auth/prisma-adapter';
import type { PrismaClient } from '@prisma/client';

/**
 * Fix TS type mismatch between PrismaClient and PrismaAdapter
 */
export function FixedPrismaAdapter(prisma: PrismaClient) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return PrismaAdapter(prisma) as any;
}
