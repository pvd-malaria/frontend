import { useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { AppContext } from '../../../../contexts/AppContext';
import CustomLink from './CustomLink';
import jsonDashboards from '../../../../contents/dashboards.json';

import './styles.css';


function Navigation() {

  const appContext = useContext(AppContext);

  return (
    <nav id="navigation">
      <ul className="container">
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
        <li className="hasSubmenu">
          <CustomLink activeClassName="active" to="/dashboards">
            Dashboards <KeyboardArrowDownIcon/>
          </CustomLink>
          <ul className="submenu">
            {
              jsonDashboards.gallery.length > 0 
                && jsonDashboards.gallery.map((item) => (
                  <li>
                  <CustomLink activeClassName="active" to={'/dashboards/'+item.id}>
                    {item.navigation_label}
                  </CustomLink>
                  </li>
                ))
            }
          </ul>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/visualizacoes">
            Visualizações
          </CustomLink>
        </li>
        <li className="hasSubmenu">
          <CustomLink activeClassName="active" to="/modelos">
            Modelos <KeyboardArrowDownIcon/>
          </CustomLink>
          <ul className="submenu">
            <li>
              <CustomLink activeClassName="active" to="/modelos/classificacao">
                Classificação
              </CustomLink>
            </li>
            <li>
              <CustomLink activeClassName="active" to="/modelos/preditivos">
                Preditivos
              </CustomLink>
            </li>
          </ul>
        </li>
        <li className="hasSubmenu">
          <CustomLink activeClassName="active" to="/producoes">
            Produções <KeyboardArrowDownIcon/>
          </CustomLink>
          <ul className="submenu">
              <li>
                <CustomLink activeClassName="active" to="/producoes/artigos">
                  Artigos
                </CustomLink>
                </li>
              <li>
                <CustomLink activeClassName="active" to="/producoes/boletins">
                  Boletins
                </CustomLink>
              </li>
              <li>
                <CustomLink activeClassName="active" to="/producoes/cursos">
                  Cursos
                </CustomLink>
              </li>
            </ul>
        </li>
        <li>
          <CustomLink activeClassName="active" to="/contato">
            Contato
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