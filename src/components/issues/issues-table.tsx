'use client';

import { PAGES } from '@/configs/pages.config';
import { Issue } from '@prisma/client';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import IssueStatusBadge from './issue-status-badge';
type Props = {
  issues: Issue[];
};

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', classname: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', classname: 'hidden md:table-cell' },
];

export default function IssuesTable({ issues }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSort = (searchParams.get('sort') as keyof Issue) || 'createdAt';
  const currentOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  function paramsToObject(params: URLSearchParams) {
    return Object.fromEntries(params.entries());
  }

  function createQueryString(column: keyof Issue) {
    const params = paramsToObject(searchParams);

    const nextOrder =
      currentSort === column && currentOrder === 'asc' ? 'desc' : 'asc';

    return {
      query: {
        ...params,
        sort: column,
        order: nextOrder,
      },
    };
  }

  return (
    <Table className=''>
      <TableHeader className='bg-card'>
        <TableRow className=''>
          {columns.map((column) => {
            const isActive = currentSort === column.value;
            return (
              <TableHead key={column.value} className={column.classname}>
                <Link
                  href={{
                    pathname,
                    ...createQueryString(column.value),
                  }}
                  className='flex items-center gap-1 cursor-pointer'
                >
                  {column.label}
                  {!isActive && <ArrowUpDown className='h-4' />}
                  {isActive && currentOrder === 'asc' && (
                    <ArrowUp className='h-4' />
                  )}
                  {isActive && currentOrder === 'desc' && (
                    <ArrowDown className='h-4' />
                  )}
                </Link>
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody className=''>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>
              <Link
                href={`${PAGES.ISSUES}/${issue.id}`}
                className='text-primary hover:underline'
              >
                {issue.title}
              </Link>
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              <IssueStatusBadge status={issue.status} />
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              {issue.createdAt.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
