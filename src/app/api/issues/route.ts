import prisma from '@/lib/prisma';
import { createIssueSchema } from '@/schemas/issue.schema';

export async function POST(request: Request) {
  const body = await request.json();

  const validated = createIssueSchema.safeParse(body);

  if (!validated.success) {
    return new Response(JSON.stringify(validated.error), { status: 400 });
  }

  const { title, description } = validated.data;

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
    },
  });

  return new Response(JSON.stringify(issue), { status: 201 });
}
