export type TVoiceRecorderUIProps = {
  title: string;
  error: string | null;
  status: string;
  isPaused: boolean;
  recordingTime: number;
  children: React.ReactNode;
  controls: React.ReactNode;
};

export type TVoiceRecorderControlsProps = {
  status: string;
  isPaused: boolean;
  isAcquiringMedia: boolean;
  onStart: () => void;
  onStop: () => void;
  onPauseResume: () => void;
};

export type TVoiceRecorderPlayerProps = {
  error: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  mediaBlobUrl: string | null;
  onPlayPause: () => void;
  onDownload: () => void;
  onClear: () => void;
};
