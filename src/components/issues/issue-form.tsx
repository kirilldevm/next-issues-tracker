'use client';

import { createIssue, updateIssue } from '@/actions/issue';
import { createIssueSchema, TCreateIssue } from '@/schemas/issue.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { toast } from 'sonner';
import Error from '../shared/error';
import Spinner from '../shared/spinner';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export default function IssueForm({ issue }: { issue?: Issue }) {
  const isEditing = !!issue;
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<TCreateIssue>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: isEditing
      ? { title: issue?.title, description: issue?.description }
      : {
          title: '',
          description: '',
        },
  });
  const { data: session } = useSession();

  function onSubmit(data: TCreateIssue) {
    startTransition(() => {
      setError(null);

      if (isEditing) {
        return updateIssue({
          values: data,
          id: issue!.id,
          userId: session!.user.id,
        }).then((res) => {
          if (res.error) {
            setError(res.error.message);
          } else if (res.success) {
            router.push(`/issues/${res.success.data.id}`);
          }
        });
      } else {
        createIssue({ values: data, userId: session!.user.id }).then((res) => {
          if (res.error) {
            setError(res.error.message);
            toast.error(res.error.message);
          } else if (res.success) {
            router.push(`/issues/${res.success.data.id}`);
          }
        });
      }
    });
  }

  if (isEditing && session?.user.id !== issue?.userId) router.push('/issues');

  return (
    <div className='max-w-4xl'>
      {error && <Error error={error} />}

      <Form {...form}>
        <form className='space-y-3 ' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <span className='inline-flex self-end'>
                  <FormLabel>Title</FormLabel>
                </span>
                <FormControl>
                  <Input {...field} placeholder='Title...' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <span className='inline-flex self-end'>
                  <FormLabel>Description</FormLabel>
                </span>
                <FormControl>
                  <SimpleMDE
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder='Description...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-4 justify-end'>
            <Button type='reset' variant='outline' onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type='submit' disabled={pending}>
              {pending ? (
                <Spinner />
              ) : isEditing ? (
                'Update Issue'
              ) : (
                'Create Issue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
