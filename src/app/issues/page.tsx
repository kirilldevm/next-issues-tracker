import IssueActions from '@/components/issues/issue-actions';
import IssuesTable from '@/components/issues/issues-table';
import Pagination from '@/components/shared/pagination';
import { SORTABLE_FIELDS } from '@/configs/issues.config';
import { PAGE_SIZE } from '@/constants';
import { getAllIssues } from '@/lib/db/issues';
import { Issue, Status } from '@prisma/client';

type Props = {
  searchParams: Promise<{
    status: Status;
    order: 'asc' | 'desc';
    sort: keyof Issue;
    page: string;
  }>;
};

export default async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const sort = (await searchParams).sort;
  const order = (await searchParams).order;
  const status = (await searchParams).status;
  const page = Number((await searchParams).page) || 1;

  const sortBy = SORTABLE_FIELDS.includes(sort) ? sort : 'createdAt';
  const orderDirection = order === 'asc' ? 'asc' : 'desc';

  const where = { status: statuses.includes(status) ? status : undefined };

  const issues = await getAllIssues({
    where,
    orderBy: { [sortBy]: orderDirection },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalIssues = await getAllIssues({ where });

  return (
    <div className='flex flex-col gap-3'>
      <IssueActions />
      <IssuesTable issues={issues} />
      <Pagination
        itemCount={totalIssues.length}
        pageSize={PAGE_SIZE}
        currentPage={page}
      />
    </div>
  );
}
