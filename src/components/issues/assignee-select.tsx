'use client';

import { updateIssue } from '@/actions/issue';
import { useUsers } from '@/hooks/use-users';
import { Issue } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, isPending, error } = useUsers();
  const { id: issueId, assignedToUserId } = issue;
  const session = useSession();
  const user = session?.data?.user;

  if (isPending)
    return (
      <Button variant={'secondary'}>
        <Skeleton className='h-8 w-full' />
      </Button>
    );
  if (error) return null;

  async function handleAssignUser(userId: string) {
    try {
      const assignedToUserId = userId === 'none' ? null : userId;
      await updateIssue({
        values: { assignedToUserId },
        id: issueId,
        userId: user!.id,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to assign user');
    }
  }

  return (
    <Select
      onValueChange={handleAssignUser}
      defaultValue={assignedToUserId || 'none'}
    >
      <SelectTrigger className='flex-1 w-full'>
        <SelectValue placeholder='Select an user' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assign User</SelectLabel>
          <SelectItem value={'none'}>None</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name || user.email}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
