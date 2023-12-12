import { useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../../../../contexts/AppContext';


interface CustomLinkProps {
  children: React.ReactNode;
  to: string;
  activeClassName?: string;
  target?: string;
}


function CustomLink(props: CustomLinkProps) {

  const appContext = useContext(AppContext);

  const isActiveClass = useCallback((params) => {
    return (params.isActive) ? props.activeClassName : '';
  }, [props.activeClassName]);
  
  return (
    <NavLink
      className={isActiveClass}
      to={props.to}
      onClick={appContext.navigationClose}
	  target={props.target}>
      {props.children}
    </NavLink>
  );
}

export default CustomLink;
