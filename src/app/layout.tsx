import { ReactNode } from 'react';
import { AppProvider } from '@/app/provider';
import '../styles/globals.css';
import AppLayout from './_components/appLayout';
import { MermaidInitializer } from '@/components/common';
import { Toaster } from 'sonner';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <MermaidInitializer>
            <AppLayout>
              <Toaster />
              {children}
            </AppLayout>
          </MermaidInitializer>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const dynamic = 'force-dynamic';
