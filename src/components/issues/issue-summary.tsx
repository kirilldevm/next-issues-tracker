import { Status } from '@prisma/client';
import { useMemo } from 'react';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { PAGES } from '@/configs/pages.config';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const statuses: { label: string; status: Status; value: number }[] = useMemo(
    () => [
      {
        label: 'Open',
        status: 'OPEN',
        value: open,
      },
      {
        label: 'In Progress',
        status: 'IN_PROGRESS',
        value: inProgress,
      },
      {
        label: 'Closed',
        status: 'CLOSED',
        value: closed,
      },
    ],
    [open, inProgress, closed]
  );

  return (
    <div className='flex gap-3'>
      {statuses.map((status) => (
        <Card key={status.status} className='flex flex-col items-center gap-1'>
          <CardContent className='flex flex-col gap-3'>
            <Link
              className='text-sm font-medium'
              href={`${PAGES.ISSUES}?status=${status.status}`}
            >
              {status.label}
            </Link>
            <span className='text-xl font-bold'>{status.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
