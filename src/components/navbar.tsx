import { PAGES } from '@/configs/pages.config';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const links = [
  { name: 'Home', href: PAGES.HOME },
  { name: 'Dashboard', href: PAGES.DASHBOARD },
];

export default function Navbar() {
  return (
    <nav className='flex flex-row gap-4 justify-between border-b border-zinc-200 p-4 mb-5'>
      <Link href={PAGES.HOME}>
        <AiFillBug size={32} />
      </Link>
      <ul className='flex gap-2'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              className='text-zinc-500 hover:text-zinc-800 transition-colors'
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
