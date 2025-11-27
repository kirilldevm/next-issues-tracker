import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { TUpdateIssue, updateIssueSchema } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  id: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const body: unknown = await request.json();
  const session = await auth();
  const { id } = await params;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const validated = updateIssueSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { message: validated.error.message },
      { status: 400 }
    );
  }

  const isIssueExists = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!isIssueExists || isIssueExists.userId !== userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
    return NextResponse.json({ message: 'Issue not found' }, { status: 500 });
  }

  return NextResponse.json(issue, { status: 200 });
}
