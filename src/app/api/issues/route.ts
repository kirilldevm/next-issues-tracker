import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createIssueSchema } from '@/schemas/issue.schema';

export async function POST(request: Request) {
  const body = await request.json();
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const userId = session.user.id;

  const validated = createIssueSchema.safeParse(body);

  if (!validated.success) {
    return new Response(JSON.stringify(validated.error.message), {
      status: 400,
    });
  }

  const { title, description } = validated.data;

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      userId,
    },
  });

  if (!issue) {
    return new Response(JSON.stringify({ message: 'Issue not created' }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(issue), { status: 201 });
}
