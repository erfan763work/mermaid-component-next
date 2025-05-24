import { Diagrams } from '@/features';

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-1 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
        <Diagrams />
      </main>
    </div>
  );
}
