import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import styles from './styles.module.scss';


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.projectBrand}>
          <Link to="/">
            <h1>PVD Malária</h1>
          </Link>
        </div>

        <div className={styles.projectSupport}>
          <Link to="/">
            LADDEM
          </Link>
        </div>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;