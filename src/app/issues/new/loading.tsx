import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingNewIssuePage() {
  return (
    <div className='max-w-4xl flex flex-col gap-4'>
      <Skeleton className='h-10 w-1/2' />

      <Skeleton className='h-62 w-full' />
    </div>
  );
}
