import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import IssueStatusBadge from './issue-status-badge';
import Link from 'next/link';
import { PAGES } from '@/configs/pages.config';
import { Issue } from '@prisma/client';

type Props = {
  issues: Issue[];
};

export default function IssuesTable({ issues }: Props) {
  return (
    <Table>
      <TableHeader className='bg-card'>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead className='hidden md:table-cell'>Status</TableHead>
          <TableHead className='hidden md:table-cell'>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
