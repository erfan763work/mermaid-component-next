'use client';

import React from 'react';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export const useAudioVisualizer = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const [waveformData, setWaveformData] = React.useState<Uint8Array>(
    new Uint8Array(0),
  );
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const animationFrameRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext ||
      (window as Window & typeof globalThis).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const updateWaveform = () => {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
      setWaveformData(dataArray);
      animationFrameRef.current = requestAnimationFrame(updateWaveform);
    };

    updateWaveform();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      source.disconnect();
      analyser.disconnect();
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [audioRef]);

  return { waveformData };
};
