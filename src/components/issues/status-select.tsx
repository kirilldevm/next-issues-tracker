'use client';

import { updateIssue } from '@/actions/issue';
import { Issue, Status } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const statuses = Object.values(Status);

export default function StatusSelect({ issue }: { issue: Issue }) {
  const { id: issueId, status } = issue;
  const session = useSession();
  const user = session?.data?.user;

  async function handleAssignStatus(status: Status) {
    try {
      await updateIssue({
        values: { status },
        id: issueId,
        userId: user!.id,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to change status');
    }
  }

  return (
    <Select onValueChange={handleAssignStatus} defaultValue={status}>
      <SelectTrigger className='flex-1 w-full'>
        <SelectValue placeholder='Select a status' />
      </SelectTrigger>
      <SelectContent>
        {statuses?.map((stat) => (
          <SelectItem key={stat} value={stat}>
            {stat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
