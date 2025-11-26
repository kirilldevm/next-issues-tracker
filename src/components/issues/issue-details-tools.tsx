'use client';

import { deleteIssue } from '@/actions/issue';
import { PAGES } from '@/configs/pages.config';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import AssigneeSelect from './assignee-select';
import { Issue } from '@prisma/client';

type Props = {
  issue: Issue;
};

export default function IssueDetailsTools({ issue }: Props) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();
  const issueId = issue.id;

  function handleDeleteIssue() {
    startTransition(async () => {
      await deleteIssue({ id: issueId, userId: session!.user.id }).then(
        (res) => {
          if (res.error) {
            console.error(res.error.message);
            toast.error(res.error.message);
          } else {
            toast.success('Issue deleted successfully');
            router.push(PAGES.ISSUES);
          }
        }
      );
    });
  }

  return (
    <div className='md:col-start-5 md:row-start-1 md:row-span-2'>
      <Dialog>
        <div className='flex md:flex-col gap-4'>
          <AssigneeSelect issue={issue} />

          <Button asChild>
            <Link href={`${PAGES.EDIT_ISSUE}/${issueId}`}>
              <Pencil2Icon />
              Edit Issue
            </Link>
          </Button>

          <DialogTrigger asChild>
            <Button variant={'destructive'}>Delete Issue</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Issue</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this issue?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>

              <Button
                variant='destructive'
                disabled={isPending}
                onClick={handleDeleteIssue}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
