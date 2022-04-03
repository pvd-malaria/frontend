import CustomLink from './CustomLink';

import styles from './styles.module.scss';


function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className="container">
        <li>
          <CustomLink activeClassName={styles.active} to="/">
            Inicial
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName={styles.active} to="/sobre">
            Sobre
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName={styles.active} to="/dashboard">
            Dashboard
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName={styles.active} to="/modelos">
            Modelos
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName={styles.active} to="/producoes">
            Produções
          </CustomLink>
        </li>
        <li>
          <CustomLink activeClassName={styles.active} to="/visualizacoes">
            Visualizações
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;