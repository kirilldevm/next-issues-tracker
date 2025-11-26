'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { PAGES } from '@/configs/pages.config';
import IssueStatusFilter from './issue-status-filter';

export default function IssueActions() {
  return (
    <div className='flex gap-3 justify-between items-center'>
      <div className='flex gap-3'>
        <IssueStatusFilter />
      </div>

      <Button asChild className='self-start'>
        <Link href={PAGES.NEW_ISSUE}>New Issue</Link>
      </Button>
    </div>
  );
}
