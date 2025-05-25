'use client';
import { MarkdownEditor } from '@/components/common';
import React from 'react';

export default function TextEditor() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Markdown Editor</h1>
      <MarkdownEditor
        onContentChange={e => console.log(e)}
        initialContent="**ERFAN**"
      />
    </div>
  );
}
