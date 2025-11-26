'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};
export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <div
      className='flex gap-3 items-center justify-center'
      aria-label='Pagination'
    >
      <p className='text-muted-foreground text-sm'>
        Page {currentPage} of {pageCount}
      </p>

      <Button disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
}
