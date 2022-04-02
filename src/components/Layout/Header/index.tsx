import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import styles from './styles.module.scss';

import LogoPvdMalaria from '../../../images/logo-pvd-malaria.svg';
import LogoLaddem from '../../../images/logo-laddem.png';


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.projectBrand}>
          <Link to="/">
            <img
              src={LogoPvdMalaria}
              alt="Logo PVD Malária - Plataforma de Visualizações de Dados" 
            />
            <h1>PVD Malária</h1>
          </Link>
        </div>

        <div className={styles.projectSupport}>
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