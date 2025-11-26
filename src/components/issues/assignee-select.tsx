'use client';

import { useUsers } from '@/hooks/use-users';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { api } from '@/lib/api';
import { PAGES } from '@/configs/pages.config';
import { Issue } from '@prisma/client';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, isPending, error } = useUsers();
  const { id: issueId, assignedToUserId } = issue;

  if (isPending) return <p>Loading...</p>;
  if (error) return null;

  async function handleAssignUser(userId: string) {
    const assignedToUserId = userId === 'none' ? null : userId;
    await api.patch(`${PAGES.ISSUES}/${issueId}`, {
      assignedToUserId,
    });
  }

  return (
    <Select
      onValueChange={handleAssignUser}
      defaultValue={assignedToUserId || 'none'}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select an user' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'none'}>None</SelectItem>
        {users?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
