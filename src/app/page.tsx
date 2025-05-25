'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-1 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
        <h1 className="text-4xl font-bold">Welcome</h1>

        <div className="flex flex-col gap-4">
          <div className="text-xl">
            <span className="font-semibold">Name:</span> Erfan Alikhani
          </div>

          <div className="text-xl">
            <span className="font-semibold">Date:</span>{' '}
            {currentDate || 'Loading...'}
          </div>

          <div className="text-xl">
            <span className="font-semibold">Time:</span>{' '}
            {currentTime || 'Loading...'}
          </div>
        </div>
      </main>
    </div>
  );
}
