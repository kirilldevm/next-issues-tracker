import IssueChart from '@/components/issues/issue-chart';
import IssueSummary from '@/components/issues/issue-summary';
import LatestIssues from '@/components/issues/latest-issues';
import { getAllIssues } from '@/lib/db/issues';

export default async function Home() {
  const openIssues = await getAllIssues({ where: { status: 'OPEN' } });
  const closedIssues = await getAllIssues({ where: { status: 'CLOSED' } });
  const inProgressIssues = await getAllIssues({
    where: { status: 'IN_PROGRESS' },
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex flex-col gap-5'>
        <IssueSummary
          open={openIssues.length}
          closed={closedIssues.length}
          inProgress={inProgressIssues.length}
        />
        <IssueChart
          open={openIssues.length}
          closed={closedIssues.length}
          inProgress={inProgressIssues.length}
        />
      </div>

      <LatestIssues />
    </div>
  );
}
