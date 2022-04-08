import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface WrapperProps {
  id?: string;
  children: ReactNode;
}


function Wrapper(props: WrapperProps) {
  return (
    <div id={props.id} className={styles.wrapper}>
      {props.children}
    </div>
  );
}

export default Wrapper;