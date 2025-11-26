'use client';

import { PAGES } from '@/configs/pages.config';
import { AvatarImage } from '@radix-ui/react-avatar';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const links = [
  { name: 'Home', href: PAGES.HOME },
  { name: 'Dashboard', href: PAGES.DASHBOARD },
  { name: 'Issues', href: PAGES.ISSUES },
];

export default function Navbar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  async function handleGetOut() {
    await signOut({
      redirectTo: PAGES.SIGN_IN,
    });
  }

  return (
    <nav className='border-b border-border py-4'>
      <div className='container flex flex-row gap-4 justify-between mx-auto'>
        <Link href={PAGES.HOME}>
          <AiFillBug size={32} />
        </Link>
        <div className='flex gap-6 items-center'>
          <ul className='flex gap-4 items-center'>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={classNames({
                    'text-primary hover:text-primary/80 underline':
                      pathname === link.href,
                    'text-secondary-foreground': pathname !== link.href,
                    'hover:text-muted-foreground transition-colors duration-200 ease-in-out':
                      true,
                  })}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {status === 'unauthenticated' && (
            <Link
              href={PAGES.SIGN_IN}
              className='text-primary hover:text-primary/80'
            >
              Sign In
            </Link>
          )}

          {status === 'authenticated' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage
                    src={session.user?.image ?? ''}
                    alt={session.user?.name ?? ''}
                  />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) ?? ''}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='start'>
                <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleGetOut()}>
                  Get out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
