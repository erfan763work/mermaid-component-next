import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { TMermaidRendererProps } from './type';

const MermaidDiagram: React.FC<TMermaidRendererProps> = ({
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

  useEffect(() => {
    mermaid.initialize(config);

    const renderDiagram = async () => {
      if (!chart || !ref.current) return;

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
  }, [chart, config, onError]);

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
