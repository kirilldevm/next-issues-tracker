import { auth } from '@/auth';
import { getAllUsers } from '@/lib/db/user';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const users = await getAllUsers();

  return new Response(JSON.stringify(users));
}
