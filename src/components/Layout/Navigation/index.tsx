import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li><Link to="/">Inicial</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/modelos">Modelos</Link></li>
        <li><Link to="/producoes">Produções</Link></li>
        <li><Link to="/visualizacoes">Visualizações</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;