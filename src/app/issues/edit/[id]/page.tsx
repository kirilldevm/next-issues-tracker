import { auth } from '@/auth';
import IssueForm from '@/components/issues/issue-form';
import { getAllIssuesId, getIssueById } from '@/lib/db/issues';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await getIssueById(id);

  return {
    title: `Edit issue - ${issue?.title} | Issue Tracker`,
  };
}

export async function generateStaticParams() {
  const issues = await getAllIssuesId();

  return issues.map((issue) => ({ id: issue.id }));
}

export default async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  if (!id) notFound();

  const issue = await getIssueById(id);

  if (!issue) notFound();

  if (session?.user.id !== issue.userId) notFound();

  return <IssueForm issue={issue} />;
}
