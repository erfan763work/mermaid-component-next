'use client';
import { MarkdownEditor } from '@/components/common';
import React from 'react';

export default function TextEditor() {
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-4 pb-1 font-[family-name:var(--font-geist-sans)] sm:p-16">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
        <div className="container mx-auto">
          <h1 className="mb-8 text-3xl font-bold">Markdown Editor</h1>
          <MarkdownEditor
            onContentChange={e => console.log(e)}
            initialContent="**ERFAN**"
          />
        </div>
      </main>
    </div>
  );
}
