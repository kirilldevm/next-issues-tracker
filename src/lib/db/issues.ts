import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { cache } from 'react';

export async function getAllIssues(
  query?: Prisma.IssueFindManyArgs<DefaultArgs>
) {
  return prisma.issue.findMany({
    ...query,
  });
}

export async function getAllIssuesId() {
  return prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  });
}

export const getIssueById = cache(async function getIssueById(id: string) {
  return prisma.issue.findUnique({
    where: { id },
  });
});
