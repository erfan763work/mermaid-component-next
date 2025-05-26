import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Trash2 } from 'lucide-react';
import type { TVoiceRecorderPlayerProps } from './type';
import { toast } from 'sonner';

const VoiceRecorderPlayer = ({
  error,
  audioRef,
  mediaBlobUrl,
  onPlayPause,
  onDownload,
  onClear,
}: Readonly<TVoiceRecorderPlayerProps>) => {
  if (!mediaBlobUrl) return null;

  return (
    <div className="mt-4 w-full space-y-3">
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPlayPause}
          className="flex-1 gap-2 sm:flex-none"
        >
          {audioRef.current?.paused ? (
            <>
              <Play className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Play</span>
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Pause</span>
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="flex-1 gap-2 sm:flex-none"
        >
          <Download className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Download</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="flex-1 gap-2 sm:flex-none"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Clear</span>
        </Button>
      </div>
      <audio
        ref={audioRef}
        src={mediaBlobUrl}
        controls
        className="w-full"
        onError={() => toast.error('Error playing audio')}
      />
    </div>
  );
};

export default VoiceRecorderPlayer;
