import { Skeleton } from '@/components/ui/skeleton';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table';

export default function IssuesLoading() {
  return (
    <Table>
      <TableHeader className='bg-card'>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead className='hidden md:table-cell'>Status</TableHead>
          <TableHead className='hidden md:table-cell'>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 12 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className='h-4 w-64' />
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              <Skeleton className='h-4 w-12 rounded-2xl' />
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
