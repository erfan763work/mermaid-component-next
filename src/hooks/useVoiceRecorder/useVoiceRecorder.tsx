'use client';

import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { toast } from 'sonner';

export const useVoiceRecorder = () => {
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    onStop: () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
      setIsPaused(false);
      toast.success('Recording saved successfully');
    },
  });

  React.useEffect(() => {
    if (status === 'recording' && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, isPaused]);

  const checkMicrophonePermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      setError('Microphone access denied or not available');
      toast.error('Microphone access denied. Please check your permissions.');
      return false;
    }
  };

  const handleStart = async () => {
    handleClear();
    setError(null);
    const hasPermission = await checkMicrophonePermissions();
    if (!hasPermission) return;

    try {
      setRecordingTime(0);
      setIsPaused(false);
      startRecording();
      toast.info('Recording started');
    } catch {
      setError('Failed to start recording');
      toast.error('Failed to start recording. Please try again.');
    }
  };

  const handleStop = () => {
    stopRecording();
    toast.info('Recording stopped');
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
      toast.info('Recording resumed');
    } else {
      pauseRecording();
      toast.info('Recording paused');
    }
    setIsPaused(!isPaused);
  };

  const handleClear = () => {
    clearBlobUrl();
    setError(null);
    toast.info('Recording cleared');
  };

  const handleDownload = () => {
    if (!mediaBlobUrl) return;

    const a = document.createElement('a');
    a.href = mediaBlobUrl;
    a.download = `recording-${new Date().toISOString()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Recording downloaded');
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          toast.error('Failed to play audio');
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return {
    status,
    isPaused,
    error,
    recordingTime,
    mediaBlobUrl,
    audioRef,
    handleStart,
    handleStop,
    handlePauseResume,
    handleClear,
    handleDownload,
    handlePlayPause,
  };
};
