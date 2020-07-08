import React from 'react';

import '../src/styles/index.css';

const Layout = ({ children }) => {
  return (
    <div className="p-20">
      {children}
    </div>
  )
}

export default Layout;
