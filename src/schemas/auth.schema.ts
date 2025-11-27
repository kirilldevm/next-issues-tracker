import z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
