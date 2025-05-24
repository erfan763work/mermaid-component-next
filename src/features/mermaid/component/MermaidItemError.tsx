import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function MermaidItemError({ error }: { error: Error }) {
  return (
    <div className="p-6">
      <Alert variant="destructive" className="mb-6">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error Loading Diagrams</AlertTitle>
        <AlertDescription>
          {error?.message ||
            'An unknown error occurred while loading diagrams.'}
        </AlertDescription>
      </Alert>
    </div>
  );
}
