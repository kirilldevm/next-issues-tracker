import { auth } from '@/auth';
import IssueDetails from '@/components/issues/issue-details';
import IssueDetailsTools from '@/components/issues/issue-details-tools';
import { getIssueById } from '@/lib/db/issues';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) {
    return {};
  }

  return {
    title: `Issue - ${issue.title}`,
    description: `Details and status for issue: ${issue.title}. Status: ${issue.status}`,
  };
}

export default async function Page({ params }: Props) {
  const session = await auth();
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) notFound();

  return (
    <div className='grid md:grid-cols-5 grid-cols-1 grid-rows-[auto_1fr] gap-5'>
      <IssueDetails issue={issue} />
      {session?.user.id === issue.userId && <IssueDetailsTools issue={issue} />}
    </div>
  );
}
