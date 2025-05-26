'use client';

import React from 'react';

interface WaveformProps {
  waveformData: Uint8Array;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

const Waveform: React.FC<WaveformProps> = ({
  waveformData,
  width = 400,
  height = 100,
  color = '#3b82f6',
  backgroundColor = 'transparent',
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();

    const sliceWidth = width / waveformData.length;
    let x = 0;

    for (let i = 0; i < waveformData.length; i++) {
      const v = waveformData[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }, [waveformData, width, height, color, backgroundColor]);

  return (
    <canvas ref={canvasRef} width={width} height={height} className="w-full" />
  );
};

export default Waveform;
