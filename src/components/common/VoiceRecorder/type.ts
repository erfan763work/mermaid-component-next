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
  onStart: () => void;
  onStop: () => void;
  onPauseResume: () => void;
  isAcquiringMedia: boolean;
};

export type TVoiceRecorderPlayerProps = {
  mediaBlobUrl: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onPlayPause: () => void;
  onDownload: () => void;
  onClear: () => void;
};
