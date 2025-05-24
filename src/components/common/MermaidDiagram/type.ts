import type { MermaidConfig } from 'mermaid';

export type TMermaidRendererProps = {
  chart: string;
  config?: MermaidConfig;
  className?: string;
  onError?: (error: Error) => void;
};
