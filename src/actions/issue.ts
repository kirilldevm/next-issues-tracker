'use server';

import { PAGES } from '@/configs/pages.config';
import prisma from '@/lib/prisma';
import { createIssueSchema, TCreateIssue } from '@/schemas/issue.schema';
import { revalidatePath } from 'next/cache';

export async function createIssue(values: TCreateIssue) {
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

export async function updateIssue(values: TCreateIssue, id: string) {
  try {
    const validated = createIssueSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: validated.error,
      };
    }

    const { title, description } = validated.data;

    const issue = await prisma.issue.update({
      where: {
        id,
      },
      data: {
        title,
        description,
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

export async function deleteIssue(id: string) {
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
