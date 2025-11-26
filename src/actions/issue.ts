'use server';

import { PAGES } from '@/configs/pages.config';
import { prisma } from '@/lib/prisma';
import {
  createIssueSchema,
  TCreateIssue,
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
        error: validated.error,
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
        error: new Error('Failed to create issue'),
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
        error,
      };
    }

    return {
      error: new Error('Failed to create issue'),
    };
  }
}

export async function updateIssue({
  values,
  id,
  userId,
}: {
  values: TCreateIssue;
  id: string;
  userId: string;
}) {
  try {
    const validated = updateIssueSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: validated.error,
      };
    }

    const { title, description, assignedToUserId, status } = validated.data;

    if (assignedToUserId) {
      const assignedToUser = await prisma.user.findUnique({
        where: {
          id: assignedToUserId,
        },
      });

      if (!assignedToUser) {
        return {
          error: new Error('User not found'),
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
        error: new Error('You are not authorized to update this issue'),
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
        status,
      },
    });

    if (!issue) {
      return {
        error: new Error('Failed to update issue'),
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
        error,
      };
    }

    return {
      error: new Error('Failed to update issue'),
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
    const issue = await prisma.issue.delete({
      where: {
        id,
      },
    });

    if (!issue) {
      return {
        error: new Error('Failed to delete issue'),
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
        error,
      };
    }

    return {
      error: new Error('Failed to delete issue'),
    };
  }
}
