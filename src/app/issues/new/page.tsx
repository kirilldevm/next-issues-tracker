import IssueForm from '@/components/issues/issue-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Issue',
};

export default function NewIssuePage() {
  return <IssueForm />;
}
