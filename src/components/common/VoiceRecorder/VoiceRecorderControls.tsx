import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause } from 'lucide-react';
import type { TVoiceRecorderControlsProps } from './type';

const VoiceRecorderControls = ({
  status,
  isPaused,
  onStart,
  onStop,
  onPauseResume,
  isAcquiringMedia,
}: Readonly<TVoiceRecorderControlsProps>) => {
  if (status !== 'recording' && !isPaused) {
    return (
      <Button
        onClick={onStart}
        variant="default"
        size="lg"
        className="gap-2"
        disabled={isAcquiringMedia}
      >
        <Mic className="h-4 w-4" />
        {isAcquiringMedia ? 'Initializing...' : 'Start Recording'}
      </Button>
    );
  }

  return (
    <div className="flex gap-4">
      <Button
        onClick={onPauseResume}
        variant={isPaused ? 'default' : 'secondary'}
        size="lg"
        className="gap-2"
      >
        {isPaused ? (
          <>
            <Play className="h-4 w-4" />
            Resume
          </>
        ) : (
          <>
            <Pause className="h-4 w-4" />
            Pause
          </>
        )}
      </Button>
      <Button
        onClick={onStop}
        variant="destructive"
        size="lg"
        className="gap-2"
      >
        <Square className="h-4 w-4" />
        Stop
      </Button>
    </div>
  );
};

export default VoiceRecorderControls;
