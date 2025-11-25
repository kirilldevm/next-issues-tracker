import prisma from '../prisma';

export async function getAllIssues() {
  return prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllIssuesId() {
  return prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  });
}

export async function getIssueById(id: string) {
  return prisma.issue.findUnique({
    where: { id },
  });
}
