import { PAGES } from '@/configs/pages.config';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex flex-row gap-4 justify-between border-b border-zinc-200 p-4 mb-5'>
      <Link href={PAGES.HOME}>Logo</Link>
      <ul className='flex gap-2'>
        <li>
          <Link href={PAGES.DASHBOARD}>Dashboard</Link>
        </li>
        <Link href={PAGES.DASHBOARD}>Dashboard</Link>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
}
