import { ReactNode } from "react";
import { Link } from "react-router-dom";

import './styles.css';


interface LinkButtonProps {
  children: ReactNode;
  id?: string;
  to?: string;
  style?: 'outlined' | 'filled';
}


function LinkButton(props: LinkButtonProps){
  return (
    <Link 
      to={props.to || 'javscript:;'}
      className={`LinkButton ${props.style || 'filled'}`}>
      {props.children}
    </Link>
  );
}

export default LinkButton;