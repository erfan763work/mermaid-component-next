import { Skeleton } from '@/components/ui/skeleton';
import { diagramTypeTitles } from './utils';

export default function MermaidItemLoading() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      {Object.keys(diagramTypeTitles).map(key => (
        <div key={key} className="mb-12 w-full">
          <Skeleton className="h-[60px] w-[30%]" />
          <div className="mt-2 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-[500px] w-[260px]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
