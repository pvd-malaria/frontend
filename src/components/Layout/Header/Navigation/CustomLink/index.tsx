import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

interface CustomLinkProps {
  children: React.ReactNode;
  to: string;
  activeClassName?: string;
}


function CustomLink(props: CustomLinkProps) {

  const isActiveClass = useCallback((params) => {
    return (params.isActive) ? props.activeClassName : '';
  }, [props.activeClassName]);
  
  return (
    <NavLink
      className={isActiveClass}
      to={props.to}>
      {props.children}
    </NavLink>
  );
}

export default CustomLink;