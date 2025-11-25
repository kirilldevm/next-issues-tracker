import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingIssueDetailPage() {
  return (
    <div>
      <Skeleton className='h-10 w-1/2' />

      <div className='flex gap-3 my-3'>
        <Skeleton className='h-6 w-12 rounded-2xl' />
        <Skeleton className='h-6 w-24' />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-muted-foreground'>Description:</CardTitle>
        </CardHeader>
        <CardContent className='prose dark:prose-invert flex flex-col gap-4'>
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4 w-1/5' />
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-1/6' />
        </CardContent>
      </Card>
    </div>
  );
}
