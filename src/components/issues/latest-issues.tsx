import { PAGES } from '@/configs/pages.config';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import IssueStatusBadge from './issue-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default async function LatestIssues() {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedToUser: true },
  });

  console.log(latestIssues);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {latestIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-2'>
                      <Link href={`${PAGES.ISSUES}/${issue.id}`}>
                        {issue.title}
                      </Link>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                    {issue.assignedToUserId && (
                      <Avatar>
                        <AvatarImage
                          src={issue.assignedToUser?.image ?? ''}
                          alt={issue.assignedToUser?.name ?? ''}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
