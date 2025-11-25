'use client';

import { PAGES } from '@/configs/pages.config';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const links = [
  { name: 'Home', href: PAGES.HOME },
  { name: 'Dashboard', href: PAGES.DASHBOARD },
  { name: 'Issues', href: PAGES.ISSUES },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='flex flex-row gap-4 justify-between border-b border-border py-4 px-4 md:px-6 xl:py-8 mb-5'>
      <Link href={PAGES.HOME}>
        <AiFillBug size={32} />
      </Link>
      <ul className='flex gap-4'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={classNames({
                'text-primary hover:text-primary/80': pathname === link.href,
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
    </nav>
  );
}
