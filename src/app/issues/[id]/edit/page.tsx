import IssueForm from '@/components/issues/issue-form';
import { getAllIssuesId, getIssueById } from '@/lib/db/issues';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const issues = await getAllIssuesId();

  return issues.map((issue) => ({ id: issue.id }));
}

export default async function EditIssuePage({ params }: Props) {
  const { id } = await params;

  if (!id) notFound();

  const issue = await getIssueById(id);

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
