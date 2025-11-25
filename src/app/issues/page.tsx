import IssuesTable from '@/components/issues/issues-table';
import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/pages.config';
import { getAllIssues } from '@/lib/db/issues';
import delay from 'delay';
import Link from 'next/link';

export default async function IssuesPage() {
  const issues = await getAllIssues();
  await delay(2000);
  return (
    <div>
      <Button asChild>
        <Link href={PAGES.NEW_ISSUE}>New Issue</Link>
      </Button>

      <IssuesTable issues={issues} />
    </div>
  );
}
