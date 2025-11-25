'use client';

import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export default function MarkdownEditor({ ...props }: any) {
  return <SimpleMDE {...props} />;
}
