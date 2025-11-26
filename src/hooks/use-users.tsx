import { api } from '@/lib/api';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export function useUsers() {
  return useQuery<Pick<User, 'id' | 'name' | 'email'>[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/users');

      return res.data;
    },
  });
}
