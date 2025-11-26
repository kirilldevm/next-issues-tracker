import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { TUpdateIssue, updateIssueSchema } from '@/schemas';
import { NextRequest } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const session = await auth();
  const { id } = await params;

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const userId = session.user.id;

  const validated = updateIssueSchema.safeParse(body);

  if (!validated.success) {
    return new Response(JSON.stringify(validated.error.message), {
      status: 400,
    });
  }

  const isIssueExists = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!isIssueExists || isIssueExists.userId !== userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const { title, description, status, assignedToUserId } =
    validated.data as TUpdateIssue;

  const issue = await prisma.issue.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  if (!issue) {
    return new Response(JSON.stringify({ message: 'Issue not updated' }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(issue), { status: 200 });
}
