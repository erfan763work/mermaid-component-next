import React from 'react';
import { useVoiceRecorder } from '@/hooks';
import {
  VoiceRecorderControls,
  VoiceRecorderPlayer,
  VoiceRecorderUI,
} from '@/components/common';

export default function VoiceRecorder() {
  const {
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
  } = useVoiceRecorder();

  return (
    <VoiceRecorderUI
      title="Voice Recorder"
      error={error}
      status={status}
      isPaused={isPaused}
      recordingTime={recordingTime}
      controls={
        <VoiceRecorderControls
          status={status}
          isPaused={isPaused}
          onStart={handleStart}
          onStop={handleStop}
          onPauseResume={handlePauseResume}
          isAcquiringMedia={status === 'acquiring_media'}
        />
      }
    >
      <VoiceRecorderPlayer
        mediaBlobUrl={mediaBlobUrl ?? null}
        audioRef={audioRef}
        error={error}
        onPlayPause={handlePlayPause}
        onDownload={handleDownload}
        onClear={handleClear}
      />
    </VoiceRecorderUI>
  );
}
