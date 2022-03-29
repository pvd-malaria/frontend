import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface WrapperProps {
  children: ReactNode;
}


function Wrapper(props: WrapperProps) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
}

export default Wrapper;