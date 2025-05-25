import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Mic, AlertCircle } from 'lucide-react';
import { formatTime } from './utils';
import type { TVoiceRecorderUIProps } from './type';

const VoiceRecorderUI = ({
  title,
  error,
  status,
  isPaused,
  recordingTime,
  children,
  controls,
}: Readonly<TVoiceRecorderUIProps>) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Status:{' '}
            <span className="capitalize">{isPaused ? 'paused' : status}</span>
          </div>
          {(status === 'recording' || isPaused) && (
            <div className="font-mono text-sm">{formatTime(recordingTime)}</div>
          )}
        </div>

        {children}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">{controls}</CardFooter>
    </Card>
  );
};

export default VoiceRecorderUI;
