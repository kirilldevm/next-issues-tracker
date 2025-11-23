'use client';

import { PAGES } from '@/configs/pages.config';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const links = [
  { name: 'Home', href: PAGES.HOME },
  { name: 'Dashboard', href: PAGES.DASHBOARD },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='flex flex-row gap-4 justify-between border-b border-zinc-200 p-4 mb-5'>
      <Link href={PAGES.HOME}>
        <AiFillBug size={32} />
      </Link>
      <ul className='flex gap-2'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              className={classNames({
                'text-zinc-900': pathname === link.href,
                'text-zinc-500': pathname !== link.href,
                'hover:text-zinc-800 transition-colors duration-200 ease-in-out':
                  true,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
