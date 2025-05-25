import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Trash2 } from 'lucide-react';
import type { TVoiceRecorderPlayerProps } from './type';

const VoiceRecorderPlayer = ({
  mediaBlobUrl,
  audioRef,
  onPlayPause,
  onDownload,
  onClear,
}: Readonly<TVoiceRecorderPlayerProps>) => {
  if (!mediaBlobUrl) return null;
  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPlayPause}
          className="gap-2"
        >
          {audioRef.current?.paused ? (
            <>
              <Play className="h-4 w-4" />
              Play
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={onClear} className="gap-2">
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>
      <audio ref={audioRef} src={mediaBlobUrl} controls className="w-full" />
    </div>
  );
};

export default VoiceRecorderPlayer;
