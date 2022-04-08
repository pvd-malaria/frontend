import { ReactNode } from 'react';

import './styles.css';

interface MainProps {
  children: ReactNode;
  id?: string;
}


function Main(props: MainProps) {
  return (
    <main id={props.id} className="main">
      {props.children}
    </main>
  );
}

export default Main;