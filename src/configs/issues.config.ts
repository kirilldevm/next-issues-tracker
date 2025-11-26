import { Issue, Status } from '@prisma/client';

export const SORTABLE_FIELDS: (keyof Issue)[] = [
  'title',
  'status',
  'createdAt',
];

export const STATUS_OPTIONS = Object.values(Status);
