/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// @ts-expect-error - easymde
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

// keep component tiny — accept value/onChange/options, memoize options
type Props = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  options?: Record<string, any>;
};

export default function MarkdownEditor({
  value = '',
  onChange,
  placeholder,
  options = {},
}: Props) {
  // memoize options so parent re-renders don't create a new object
  const stableOptions = useMemo(() => {
    return {
      placeholder,
      autofocus: false,
      spellChecker: false,
      autoDownloadFontAwesome: false,
      ...options,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    placeholder,
    /* keep dependencies minimal: only primitives */ JSON.stringify(options),
  ]);

  return (
    <SimpleMDE value={value} onChange={onChange} options={stableOptions} />
  );
}
