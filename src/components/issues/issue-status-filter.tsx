'use client';

import { Status } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
];

export default function IssueStatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const possibleStatuses = Object.values(Status) as Status[];
  const status = possibleStatuses.includes(searchParams.get('status') as Status)
    ? (searchParams.get('status') as Status)
    : searchParams.get('status') || 'ALL';

  function handleChangeStatus(stat: (typeof statuses)[number]['value']) {
    const params = new URLSearchParams(searchParams.toString());
    if (stat === 'ALL') params.delete('status');
    else params.set('status', stat);
    // const query = stat === 'ALL' ? '' : '?status=' + stat;
    // router.push(`${pathname}${query}`);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={handleChangeStatus} defaultValue={status}>
      <SelectTrigger>
        <SelectValue placeholder='Filter by status' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by status</SelectLabel>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
