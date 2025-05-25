'use client';
import { MarkdownEditor } from '@/features/textEditor';
import React from 'react';

export default function TextEditor() {
  const [content, setContent] = React.useState<string>('');
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-4 pb-1 font-[family-name:var(--font-geist-sans)] sm:p-16">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
        <div className="w-full">
          <MarkdownEditor content={content} onChange={handleContentChange} />
        </div>
      </main>
    </div>
  );
}
