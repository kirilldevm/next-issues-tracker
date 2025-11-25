import prisma from '../prisma';

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}
