'use client';

import { PAGES } from '@/configs/pages.config';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
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
import { useTransition } from 'react';
import { deleteIssue } from '@/actions/issue';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function IssueDetailsTools({ issueId }: { issueId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDeleteIssue() {
    startTransition(async () => {
      await deleteIssue(issueId).then((res) => {
        if (res.error) {
          console.error(res.error.message);
          toast.error(res.error.message);
        } else {
          toast.success('Issue deleted successfully');
          router.push(PAGES.ISSUES);
        }
      });
    });
  }

  return (
    <div className='md:col-start-5 md:row-start-1 md:row-span-2'>
      <Dialog>
        <div className='flex md:flex-col gap-4'>
          <Button asChild>
            <Link href={`${PAGES.ISSUES}/${issueId}/edit`}>
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
