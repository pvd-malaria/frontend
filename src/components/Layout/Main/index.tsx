import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface MainProps {
  children: ReactNode;
}


function Main(props: MainProps) {
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  );
}

export default Main;