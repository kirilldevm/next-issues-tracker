'use client';

import { signInAction } from '@/actions/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PAGES } from '@/configs/pages.config';
import { SOCIALS } from '@/configs/socials.config';
import { loginSchema, TLoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Error from '../shared/error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

export default function SigninForm() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSubmit(data: TLoginSchema) {
    startTransition(async () => {
      setError(null);
      try {
        const res = await signInAction(data);

        const { error, success } = res;

        if (error) {
          setError(error);
          toast.error(error);
          return;
        }

        if (success) {
          toast.success('Signed in successfully');
          update();
          router.push(PAGES.ISSUES);
        }
      } catch {
        setError('Something went wrong');
        toast.error('Something went wrong');
      }
    });
  }

  async function handleSocial(name: string) {
    await signIn(name, { callbackUrl: PAGES.ISSUES });
  }

  return (
    <Card className='min-w-sm w-auto border-none'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <Error error={error} />}

            <Button type='submit' disabled={isPending}>
              Submit
            </Button>

            <p className='text-center text-xs uppercase font-semibold'>or</p>
            {SOCIALS.map((social) => (
              <Button
                key={social.name}
                type='button'
                variant='outline'
                onClick={() => handleSocial(social.name)}
                disabled={isPending}
              >
                <social.icon />
                {social.displayName}
              </Button>
            ))}
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}
