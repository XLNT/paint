import React from 'react';

import '../src/styles/index.css';
import usePaintFonts from '../src/utils/usePaintFonts'

const Layout = ({ children }) => {
  usePaintFonts();

  return <div className="p-10 bg-drywall text-bruise">{children}</div>
}

export default Layout;
