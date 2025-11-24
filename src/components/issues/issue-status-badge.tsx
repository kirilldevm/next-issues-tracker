import { Status } from '@prisma/client';
import { Badge } from '../ui/badge';
import { PropsWithChildren } from 'react';

type Props = {
  status: Status;
};

const variants: Record<Status, { label: string; className: string }> = {
  [Status.OPEN]: { label: 'Open', className: 'bg-red-400/20 text-red-400' },
  [Status.IN_PROGRESS]: {
    label: 'In Progress',
    className: 'bg-violet-400/20 text-violet-400',
  },
  [Status.CLOSED]: {
    label: 'Closed',
    className: 'bg-emerald-400/20 text-emerald-400',
  },
};

export default function IssueStatusBadge({ status }: Props) {
  return (
    <Badge className={`${variants[status].className} capitalize`}>
      {variants[status].label}
    </Badge>
  );
}
