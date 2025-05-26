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
  const isSafari =
    typeof window !== 'undefined' &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
    askPermissionOnMount: true,
    onStop: () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
      setIsPaused(false);
      toast.success('Recording saved successfully');
    },
    // Safari needs specific mimeType
    blobPropertyBag: {
      type: isSafari ? 'audio/mp4' : 'audio/wav',
    },
    mediaRecorderOptions: isSafari ? { mimeType: 'audio/mp4' } : undefined,
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
      // Safari requires direct access to microphone without checking first
      if (isSafari) return true;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Microphone permission error:', err);
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
      await startRecording();
      toast.info('Recording started');
    } catch (err) {
      console.error('Recording start error:', err);
      setError('Failed to start recording');
      toast.error('Failed to start recording. Please try again.');
    }
  };

  const handleStop = () => {
    try {
      stopRecording();
      toast.info('Recording stopped');
    } catch (err) {
      console.error('Recording stop error:', err);
      setError('Failed to stop recording');
      toast.error('Failed to stop recording. Please try again.');
    }
  };

  const handlePauseResume = () => {
    try {
      if (isPaused) {
        resumeRecording();
        toast.info('Recording resumed');
      } else {
        pauseRecording();
        toast.info('Recording paused');
      }
      setIsPaused(!isPaused);
    } catch (err) {
      console.error('Pause/resume error:', err);
      setError('Failed to pause/resume recording');
      toast.error('Failed to pause/resume recording. Please try again.');
    }
  };

  const handleClear = () => {
    try {
      clearBlobUrl();
      setError(null);
      toast.info('Recording cleared');
    } catch (err) {
      console.error('Clear error:', err);
      setError('Failed to clear recording');
      toast.error('Failed to clear recording. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!mediaBlobUrl) return;

    try {
      const a = document.createElement('a');
      a.href = mediaBlobUrl;
      // Use appropriate extension based on browser
      const extension = isSafari ? 'mp4' : 'wav';
      a.download = `recording-${new Date().toISOString()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Recording downloaded');
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download recording');
      toast.error('Failed to download recording. Please try again.');
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(err => {
          console.error('Play error:', err);
          toast.error('Failed to play audio');
        });
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.error('Play/pause error:', err);
      toast.error('Failed to play/pause audio');
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
