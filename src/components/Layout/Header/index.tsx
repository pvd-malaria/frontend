import { useContext } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { AppContext } from '../../../contexts/AppContext';

import Navigation from './Navigation';

import './styles.css';

import LogoPvdMalaria from '../../../images/logo-pvd-malaria.svg';
import LogoLaddem from '../../../images/logo-laddem.png';
import LogoLaddemMobile from '../../../images/logo-laddem-mobile.png';


function Header() {
  const appContext = useContext(AppContext);

  return (
    <header id="header">
      <div className="container">
        <div className="projectBrand">
          <Link to="/">
            <img
              src={LogoPvdMalaria}
              alt="Logo PVD Malária - Plataforma de Visualizações de Dados" 
            />
            <h1>PVD Malária</h1>
          </Link>
        </div>

        <div className="projectSupport">
          <Link to="/">
            <img
              className="defaultLogoLaddem"
              src={LogoLaddem}
              alt="Logo LADDEM - Laboratório de dados demográficos"
            />
            <img
              className="mobileLogoLaddem"
              src={LogoLaddemMobile}
              alt="Logo LADDEM - Laboratório de dados demográficos"
            />
          </Link>
        </div>

        <div className="mobileMenu">
          <IconButton onClick={appContext.navigationOpen}>
            <MenuIcon fontSize="large"/>
          </IconButton>
        </div>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;