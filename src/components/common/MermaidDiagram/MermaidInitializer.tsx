'use client';
import { useEffect } from 'react';
import mermaid from 'mermaid';
import type { ReactNode } from 'react';

const MermaidInitializer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  return <>{children}</>;
};

export default MermaidInitializer;
