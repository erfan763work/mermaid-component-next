'use client';

import { useState, useRef, useEffect } from 'react';

export const useVoiceRecorder = () => {
  const [status, setStatus] = useState<
    'idle' | 'recording' | 'paused' | 'acquiring_media'
  >('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const isSafari =
    typeof window !== 'undefined' &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
  ) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const checkMicrophonePermissions = async () => {
    try {
      if (isSafari) return true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Microphone permission error:', err);
      setError('Microphone access denied or not available');
      showToast(
        'Microphone access denied. Please check your permissions.',
        'error',
      );
      return false;
    }
  };

  const startRecording = async () => {
    try {
      setStatus('acquiring_media');
      const hasPermission = await checkMicrophonePermissions();
      if (!hasPermission) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = isSafari ? { mimeType: 'audio/mp4' } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: isSafari ? 'audio/mp4' : 'audio/wav',
        });
        const url = URL.createObjectURL(audioBlob);
        setMediaBlobUrl(url);
        setRecordingTime(0);
        showToast('Recording saved successfully', 'success');
      };

      mediaRecorder.start();
      setStatus('recording');
      setRecordingTime(0);
      showToast('Recording started', 'info');

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Recording start error:', err);
      setError('Failed to start recording');
      setStatus('idle');
      showToast('Failed to start recording. Please try again.', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach(track => track.stop());
      mediaRecorderRef.current = null;
      setStatus('idle');
      showToast('Recording stopped', 'info');

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.pause();
      setStatus('paused');
      showToast('Recording paused', 'info');

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && status === 'paused') {
      mediaRecorderRef.current.resume();
      setStatus('recording');
      showToast('Recording resumed', 'info');

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const clearRecording = () => {
    setMediaBlobUrl(null);
    setError(null);
    showToast('Recording cleared', 'info');
  };

  const downloadRecording = () => {
    if (!mediaBlobUrl) return;

    try {
      const a = document.createElement('a');
      a.href = mediaBlobUrl;
      const extension = isSafari ? 'mp4' : 'wav';
      a.download = `recording-${new Date().toISOString()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Recording downloaded', 'success');
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download recording');
      showToast('Failed to download recording. Please try again.', 'error');
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(err => {
          console.error('Play error:', err);
          showToast('Failed to play audio', 'error');
        });
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.error('Play/pause error:', err);
      showToast('Failed to play/pause audio', 'error');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          ?.getTracks()
          .forEach(track => track.stop());
      }
    };
  }, []);

  return {
    status,
    isPaused: status === 'paused',
    error,
    recordingTime,
    mediaBlobUrl,
    audioRef,
    handleStart: startRecording,
    handleStop: stopRecording,
    handlePauseResume: status === 'paused' ? resumeRecording : pauseRecording,
    handleClear: clearRecording,
    handleDownload: downloadRecording,
    handlePlayPause: togglePlayPause,
  };
};
