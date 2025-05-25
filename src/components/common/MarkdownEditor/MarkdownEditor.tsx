'use client';

import { useState } from 'react';
import MarkdownEditorLib from '@uiw/react-markdown-editor';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function MarkdownEditor({
  initialContent = '',
  onContentChange,
}: {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}) {
  const [markdown, setMarkdown] = useState(initialContent);

  const handleChange = (value: string) => {
    setMarkdown(value);
    if (onContentChange) {
      onContentChange(value);
    }
  };

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none">
      <div className="min-h-[200px] rounded-lg border p-4">
        <MarkdownEditorLib
          value={markdown}
          onChange={handleChange}
          height="200px"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-medium text-gray-700">Markdown Output:</h3>
        <pre className="overflow-x-auto rounded-md bg-gray-50 p-4 text-sm">
          <MarkdownEditorLib.Markdown source={markdown} />
        </pre>
      </div>
    </div>
  );
}
