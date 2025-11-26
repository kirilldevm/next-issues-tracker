import IssueActions from '@/components/issues/issue-actions';
import IssuesTable from '@/components/issues/issues-table';
import { SORTABLE_FIELDS } from '@/configs/issues.config';
import { getAllIssues } from '@/lib/db/issues';
import { Issue, Status } from '@prisma/client';

type Props = {
  searchParams: Promise<{
    status: Status;
    order: 'asc' | 'desc';
    sort: keyof Issue;
  }>;
};

export default async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const sort = (await searchParams).sort;
  const order = (await searchParams).order;
  const status = (await searchParams).status;

  const sortBy = SORTABLE_FIELDS.includes(sort) ? sort : 'createdAt';
  const orderDirection = order === 'asc' ? 'asc' : 'desc';

  const issues = await getAllIssues({
    where: { status: statuses.includes(status) ? status : undefined },
    orderBy: { [sortBy]: orderDirection },
  });

  return (
    <div className='flex flex-col gap-3'>
      <IssueActions />
      <IssuesTable issues={issues} />
    </div>
  );
}
