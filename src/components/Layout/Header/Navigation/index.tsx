import { useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AppContext } from '../../../../contexts/AppContext';
import CustomLink from './CustomLink';

import './styles.css';


function Navigation() {

  const appContext = useContext(AppContext);

  return (
    <nav id="navigation">
      <ul>
        <li>
          <CustomLink activeClassName="active" to="/">
            Inicial
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/sobre">
            Sobre
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/dashboard">
            Dashboard
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/modelos">
            Modelos
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/producoes">
            Produções
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/visualizacoes">
            Visualizações
          </CustomLink>
        </li>
      </ul>
      
      <IconButton id="closeIconButton" onClick={appContext.navigationClose}>
        <CloseIcon fontSize="large"/>
      </IconButton>
    </nav>
  );
}

export default Navigation;