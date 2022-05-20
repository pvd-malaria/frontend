import { ReactNode } from "react";
import { Link } from "react-router-dom";

import './styles.css';


interface LinkButtonProps {
  children: ReactNode;
  className?: string;
  id?: string;
  icon?: ReactNode;
  to?: string;
  style?: 'none' | 'outlined' | 'contained';
}


function LinkButton(props: LinkButtonProps){
  return (
    <Link 
      to={props.to || 'javascript:;'}
      className={`LinkButton 
        ${props.className}
        ${props.style || 'contained'}
      `}
    >
      {props.icon && props.icon}
      <span>{props.children}</span>
    </Link>
  );
}

export default LinkButton;