'use client';
import { Issue } from '@prisma/client';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import IssueStatusBadge from './issue-status-badge';
import { IssueQuery } from '@/app/issues/page';

type Props = {
  issues: Issue[];
  searchParams: IssueQuery;
};

const columns = [
  { label: 'Issue', value: 'title' as keyof Issue },
  { label: 'Status', value: 'status' as keyof Issue },
  { label: 'Created', value: 'createdAt' as keyof Issue },
];

export default function IssuesTable({ issues, searchParams }: Props) {
  const currentSort = searchParams?.sort;
  const currentOrder = searchParams?.order;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.value}>
              <Link
                href={{
                  pathname: '/issues',
                  query: {
                    ...searchParams,
                    sort: col.value,
                    order: currentOrder === 'asc' ? 'desc' : 'asc',
                  },
                }}
                className='flex items-center gap-1'
              >
                {col.label}
                {!currentSort || currentSort !== col.value ? (
                  <ArrowUpDown className='h-4' />
                ) : null}
                {currentSort === col.value && currentOrder === 'asc' && (
                  <ArrowUp className='h-4' />
                )}
                {currentSort === col.value && currentOrder === 'desc' && (
                  <ArrowDown className='h-4' />
                )}
              </Link>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.title}</TableCell>
            <TableCell>
              <IssueStatusBadge status={issue.status} />
            </TableCell>
            <TableCell>{issue.createdAt.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
