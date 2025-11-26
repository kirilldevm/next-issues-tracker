import { Status } from '@prisma/client';
import z from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export const updateIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' })
    .optional(),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .optional(),
  status: z.enum(Status).default('OPEN').optional(),
  assignedToUserId: z.string().nullable().optional(),
});

export type TUpdateIssue = z.infer<typeof updateIssueSchema>;

export type TCreateIssue = z.infer<typeof createIssueSchema>;
