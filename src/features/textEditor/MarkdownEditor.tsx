'use client';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Markdown } from 'tiptap-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TextEditor } from '@/components/common';
import type { TMarkdownEditorProps } from './type';

export default function MarkdownEditor({
  content,
  onChange,
  onChangeMarkdown,
}: Readonly<TMarkdownEditorProps>) {
  const editor = useEditor({
    extensions: [
      Markdown.configure({
        transformPastedText: true,
        transformCopiedText: true,
      }),
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-6',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-6',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-[300px] w-full p-4 focus:outline-none prose max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
      if (onChangeMarkdown) {
        onChangeMarkdown(editor.storage.markdown?.getMarkdown());
      }
    },
  });

  const markdown = editor?.storage.markdown?.getMarkdown() || '';

  return (
    <div className="mx-auto w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor</CardTitle>
        </CardHeader>
        <CardContent className="w-full p-0">
          <div className="w-full rounded-lg border">
            <TextEditor editor={editor ?? undefined} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Markdown Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="markdown">
            <TabsList>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
            </TabsList>
            <TabsContent value="markdown">
              <ScrollArea className="h-48 rounded-md border p-4 font-mono text-sm">
                {markdown}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="html">
              <ScrollArea className="h-48 rounded-md border p-4 font-mono text-sm">
                {editor?.getHTML()}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
