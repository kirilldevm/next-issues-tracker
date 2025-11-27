import IssueActions from '@/components/issues/issue-actions';
import IssuesTable from '@/components/issues/issues-table';
import Pagination from '@/components/shared/pagination';
import { SORTABLE_FIELDS } from '@/configs/issues.config';
import { PAGE_SIZE } from '@/constants';
import { getAllIssues } from '@/lib/db/issues';
import { Issue, Status } from '@prisma/client';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Issues',
};

export type IssueQuery = {
  sort?: keyof Issue;
  order?: 'asc' | 'desc';
  status?: Status;
  page?: string;
};

type IssuesPageProps = {
  searchParams: Promise<IssueQuery>;
};

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const { sort, order, status, page: pageParam } = await searchParams;
  const sortBy: keyof Issue = SORTABLE_FIELDS.includes(sort as keyof Issue)
    ? (sort as keyof Issue)
    : 'createdAt';

  const orderDirection: 'asc' | 'desc' = order === 'asc' ? 'asc' : 'desc';

  const statusParam =
    status && Object.values(Status).includes(status as Status)
      ? (status as Status)
      : undefined;

  const page = Number(pageParam) || 1;

  const issues = await getAllIssues({
    where: { status: statusParam },
    orderBy: { [sortBy]: orderDirection } as Record<
      keyof Issue,
      'asc' | 'desc'
    >,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalIssues = await getAllIssues({ where: { status } });

  return (
    <div className='flex flex-col gap-5'>
      <IssueActions />
      <Suspense fallback={<p>Loading...</p>}>
        <IssuesTable issues={issues} searchParams={await searchParams} />
        <Pagination
          itemCount={totalIssues.length}
          pageSize={PAGE_SIZE}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}
