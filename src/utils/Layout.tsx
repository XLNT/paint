import React, { PropsWithChildren } from 'react';

import '../styles/index.css';
import usePaintFonts from './usePaintFonts';

function Layout({ children }: PropsWithChildren<{}>) {
  usePaintFonts();

  return <div className="p-10 bg-drywall text-bruise">{children}</div>;
}

export default Layout;
