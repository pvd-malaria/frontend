import React, { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}


function Layout(props: LayoutProps){
  return (
    <div>
      <Navigation />
      <main>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;