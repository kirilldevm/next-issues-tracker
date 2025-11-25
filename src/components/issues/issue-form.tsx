'use client';

import { createIssue, updateIssue } from '@/actions/issue';
import { createIssueSchema, TCreateIssue } from '@/schemas/issue.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Callout } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
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

  function onSubmit(data: TCreateIssue) {
    startTransition(() => {
      setError(null);

      if (isEditing) {
        return updateIssue(data, issue!.id).then((res) => {
          if (res.error) {
            setError(res.error.message);
          } else {
            router.push(`/issues/${res.success.data.id}`);
          }
        });
      } else {
        createIssue(data).then((res) => {
          if (res.error) {
            setError(res.error.message);
          } else {
            router.push(`/issues/${res.success.data.id}`);
          }
        });
      }
    });
  }

  return (
    <div className='max-w-4xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

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
