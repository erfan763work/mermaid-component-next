'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { TMermaidRendererProps } from './type';

const MermaidDiagram: React.FC<Readonly<TMermaidRendererProps>> = ({
  chart,
  config = {
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
  },
  onError,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const initializedRef = useRef(false);
  const prevChartRef = useRef<string>('');

  useEffect(() => {
    if (!initializedRef.current) {
      mermaid.initialize(config);
      initializedRef.current = true;
    }
  }, [config]);

  useEffect(() => {
    if (!chart || !ref.current || chart === prevChartRef.current) return;
    prevChartRef.current = chart;

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.floor(Math.random() * 10000)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        setSvg('<p>Error rendering diagram</p>');
        onError?.(error as Error);
      }
    };

    renderDiagram();
  }, [chart, onError]);

  return (
    <div
      ref={ref}
      className={`mermaid ${className}`}
      aria-label="Mermaid diagram"
      data-testid="mermaid-container"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
