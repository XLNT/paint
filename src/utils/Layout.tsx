import React, { PropsWithChildren } from 'react';

import '../styles/index.css';

import { usePaintFonts } from './usePaintFonts';
import { cn } from './cn';

function Layout({ children }: PropsWithChildren<{}>) {
  usePaintFonts();

  return (
    <div className={cn('h-screen p-10', 'bg-drywall text-bruise antialiased font-sans')}>
      {children}
    </div>
  );
}

export default Layout;
