import IssueStatusBadge from './issue-status-badge';
import { Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import { CardHeader, CardTitle, CardContent, Card } from '../ui/card';
import { Issue } from '@prisma/client';

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <div className='md:col-span-4 md:row-span-1'>
        <h1 className='font-bold text-3xl'>{issue.title}</h1>

        <div className='flex gap-3 my-3'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </div>
      </div>

      <div className='md:col-span-4 md:row-span-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-muted-foreground'>
              Description:
            </CardTitle>
          </CardHeader>
          <CardContent className='prose dark:prose-invert'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
