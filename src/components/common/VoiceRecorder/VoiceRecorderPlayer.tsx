import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Trash2 } from 'lucide-react';
import type { TVoiceRecorderPlayerProps } from './type';
import { toast } from 'sonner';
import Waveform from './Waveform';
import { useAudioVisualizer } from '@/hooks';

const VoiceRecorderPlayer = ({
  error,
  audioRef,
  mediaBlobUrl,
  onPlayPause,
  onDownload,
  onClear,
}: Readonly<TVoiceRecorderPlayerProps>) => {
  const { waveformData } = useAudioVisualizer(audioRef);

  if (!mediaBlobUrl) return null;

  return (
    <div className="mt-4 space-y-3">
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
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
      <Waveform waveformData={waveformData} />
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
