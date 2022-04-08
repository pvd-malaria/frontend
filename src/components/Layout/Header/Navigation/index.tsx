import CustomLink from './CustomLink';

import './styles.css';


function Navigation() {
  return (
    <nav className="navigation">
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
    </nav>
  );
}

export default Navigation;