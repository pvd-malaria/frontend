import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import './styles.css';

import LogoPvdMalaria from '../../../images/logo-pvd-malaria.svg';
import LogoLaddem from '../../../images/logo-laddem.png';


function Header() {
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
              src={LogoLaddem}
              alt="Logo LADDEM - Laboratório de dados demográficos"
            />
          </Link>
        </div>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;