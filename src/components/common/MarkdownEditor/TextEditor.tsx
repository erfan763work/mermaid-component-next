'use client';

import { EditorContent } from '@tiptap/react';
import MenuBar from './MenuBar';
import type { TTextEditorProps } from './type';

export default function TextEditor({ editor }: Readonly<TTextEditorProps>) {
  return (
    <>
      <MenuBar editor={editor ?? null} />
      <EditorContent editor={editor ?? null} />
    </>
  );
}
