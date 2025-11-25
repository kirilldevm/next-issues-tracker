'use client';

import IssueFormLoading from '@/components/issues/issue-form-loading';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(() => import('@/components/issues/issue-form'), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

export default function NewIssuePage() {
  return <IssueForm />;
}
