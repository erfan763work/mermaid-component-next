'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-1 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
        <h1 className="text-4xl font-bold">Welcome </h1>

        <div className="flex flex-col gap-4">
          <div className="text-xl">
            <span className="font-semibold">Name:</span> Erfan Alikhani
          </div>

          <div className="text-xl">
            <span className="font-semibold">Date:</span> {formattedDate}
          </div>

          <div className="text-xl">
            <span className="font-semibold">Time:</span> {formattedTime}
          </div>
        </div>
      </main>
    </div>
  );
}
