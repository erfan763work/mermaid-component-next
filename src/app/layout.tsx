import { ReactNode } from 'react';
import { AppProvider } from '@/app/provider';
import '../styles/globals.css';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const dynamic = 'force-dynamic';
