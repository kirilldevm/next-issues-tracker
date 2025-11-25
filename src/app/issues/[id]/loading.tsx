import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingIssueDetailPage() {
  return (
    <div className='grid md:grid-cols-5 grid-cols-1 gap-5'>
      <div className='md:col-span-4'>
        <Skeleton className='h-10 w-1/2' />

        <div className='flex gap-3 my-3'>
          <Skeleton className='h-8 w-12 rounded-2xl' />
          <Skeleton className='h-8 w-24' />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='text-muted-foreground'>
              Description:
            </CardTitle>
          </CardHeader>
          <CardContent className='prose dark:prose-invert flex flex-row gap-3'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-1/3' />
            <Skeleton className='h-4 w-1/6' />
            <Skeleton className='h-4 w-1/5' />
          </CardContent>
        </Card>
      </div>

      <div className='col-span-1 flex gap-3 md:flex-col'>
        <Button asChild>
          <Skeleton className='h-8 w-22' />
        </Button>
      </div>
    </div>
  );
}
