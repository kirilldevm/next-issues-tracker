import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/pages.config';
import Link from 'next/link';

export default function IssueNotFoundPage({}) {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-full'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p>Issue not found</p>
      {/* <LinkIcon /> */}
      <Button asChild variant={'link'}>
        <Link href={PAGES.ISSUES} className='text-xl font-semibold'>
          Issues
        </Link>
      </Button>
    </div>
  );
}
