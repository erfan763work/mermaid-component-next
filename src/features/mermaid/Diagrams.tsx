'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { diagramTypeTitles } from './component/utils';
import MermaidItemLoading from './component/MermaidItemLoading';
import MermaidItemError from './component/MermaidItemError';
import { useAllDiagrams } from '@/hooks';
import { MermaidDiagram } from '@/components/common';

export default function AllDiagramsView() {
  const { data, isLoading, isError, error } = useAllDiagrams();

  if (isLoading) {
    return <MermaidItemLoading />;
  }

  if (isError) {
    return <MermaidItemError error={error} />;
  }

  return (
    <div className="sm:p-4 md:p-6 lg:p-8">
      {Object.entries(diagramTypeTitles).map(([key, title]) => {
        const diagrams = data?.[key as keyof typeof data];
        if (!diagrams || diagrams.length === 0) return null;

        return (
          <div key={key} className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <Badge variant="default" className="ml-2">
                {diagrams.length} diagrams
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {diagrams.map(diagram => (
                <div key={diagram.id} className="w-full">
                  <Card className="flex h-full flex-col rounded-lg p-4 transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="flex-grow">
                      <MermaidDiagram chart={diagram?.code} />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                      {diagram?.title || 'Untitled Diagram'}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {data && Object.values(data).every(arr => arr.length === 0) && (
        <Alert className="mt-6">
          <AlertTitle>No Diagrams Found</AlertTitle>
          <AlertDescription>
            Create your first diagram to get started!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
