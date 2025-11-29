'use server';

import { PAGES } from '@/configs/pages.config';
import { prisma } from '@/lib/prisma';
import {
  createIssueSchema,
  TCreateIssue,
  TUpdateIssue,
  updateIssueSchema,
} from '@/schemas/issue.schema';
import { revalidatePath } from 'next/cache';

export async function createIssue({
  values,
  userId,
}: {
  values: TCreateIssue;
  userId: string;
}) {
  try {
    const validated = createIssueSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: 'Invalid credentials',
      };
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
      return {
        error: 'Failed to create issue',
      };
    }

    revalidatePath(PAGES.ISSUES);

    return {
      success: { data: issue },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Failed to create issue',
    };
  }
}

export async function updateIssue({
  values,
  id,
  userId,
}: {
  values: TUpdateIssue;
  id: string;
  userId: string;
}) {
  try {
    const validated = updateIssueSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: 'Invalid credentials',
      };
    }

    const { title, description, assignedToUserId, status } = values;

    if (assignedToUserId) {
      const assignedToUser = await prisma.user.findUnique({
        where: {
          id: assignedToUserId,
        },
      });

      if (!assignedToUser) {
        return {
          error: 'User does not exist',
        };
      }
    }

    const issueExists = await prisma.issue.findUnique({
      where: {
        id,
      },
    });

    if (!issueExists || issueExists.userId !== userId) {
      return {
        error: 'You are not authorized to update this issue',
      };
    }

    const issue = await prisma.issue.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        assignedToUserId,
        status: status || issueExists.status,
      },
    });

    if (!issue) {
      return {
        error: 'Failed to update issue',
      };
    }

    revalidatePath(PAGES.ISSUES);

    return {
      success: { data: issue },
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Failed to update issue',
    };
  }
}

export async function deleteIssue({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  try {
    const issueExists = await prisma.issue.findUnique({
      where: {
        id,
      },
    });

    if (!issueExists || issueExists.userId !== userId) {
      return {
        error: 'You are not authorized to delete this issue',
      };
    }

    const issue = await prisma.issue.delete({
      where: {
        id,
      },
    });

    if (!issue) {
      return {
        error: 'Failed to delete issue',
      };
    }

    revalidatePath(PAGES.ISSUES);

    return {
      success: { data: issue },
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Failed to delete issue',
    };
  }
}
