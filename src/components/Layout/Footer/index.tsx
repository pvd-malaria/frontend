import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <h3 className="title">Execução</h3>
        <div className="item"><Link to="/"><img src="" alt="Unicamp" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="Instituto Federal" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="Unesp" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="Laddem" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="Nepo" /></Link></div>
      </section>
      <section>
        <h3 className="title">Apoio</h3>
        <div className="item"><Link to="/"><img src="" alt="Funcamp" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="Fiotec" /></Link></div>
      </section>
      <section>
        <h3 className="title">Financiamento</h3>
        <div className="item"><Link to="/"><img src="" alt="Bill & Melinda Gates" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="CNPq" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="Decit" /></Link></div>
        <div className="item"><Link to="/"><img src="" alt="SUS" /></Link></div>
      </section>
    </footer>
  );
}

export default Footer;