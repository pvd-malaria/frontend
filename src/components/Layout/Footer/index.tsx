import { Link } from 'react-router-dom';

import LogoUnicamp from './../../../images/logo-unicamp.svg';
import LogoInstitutoFederal from './../../../images/logo-instituto-federal-sao-paulo-campus-campinas.svg';
import LogoUnesp from './../../../images/logo-unesp.svg';
import LogoLaddem from './../../../images/logo-laddem.png';
import LogoNepo from './../../../images/logo-nepo.svg';
import LogoFuncamp from './../../../images/logo-funcamp.svg';
import LogoFiotec from './../../../images/logo-fiotec.svg';
import LogoBilleMelindaGates from './../../../images/logo-bill-melinda-gates-foundation.svg';
import LogoCNPq from './../../../images/logo-cnpq.svg';
import LogoSUS from './../../../images/logo-sus-ministerio-da-saude.svg';
import LogoInovia from './../../../images/logo-inovia.png';

import './styles.css';


function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <section>
          <div className="info">
            <span className="title">Execução</span>
          </div>
          <div className="items">
            <Link to="/"><img src={LogoUnicamp} alt="Unicamp" /></Link>
            <Link to="/"><img src={LogoInstitutoFederal} alt="Instituto Federal" /></Link>
            <Link to="/"><img src={LogoUnesp} alt="Unesp" /></Link>
            <Link to="/"><img src={LogoLaddem} alt="Laddem" /></Link>
            <Link to="/"><img src={LogoNepo} alt="Nepo" /></Link>
            <a href='https://www.inoviacorp.com/'><img src={LogoInovia} alt="Inovia" /></a>
          </div>
        </section>

        <section>
          <div className="info">
            <span className="title">Apoio</span>
          </div>
          <div className="items">
            <Link to="/"><img src={LogoFuncamp} alt="Funcamp" /></Link>
            <Link to="/"><img src={LogoFiotec} alt="Fiotec" /></Link>
          </div>
        </section>
        
        <section>
          <div className="info">
            <span className="title">Financiamento</span>
          </div>
          <div className="items">
            <Link to="/"><img src={LogoBilleMelindaGates} alt="Bill & Melinda Gates" /></Link>
            <Link to="/"><img src={LogoCNPq} alt="CNPq" /></Link>
            <Link to="/"><img src={LogoSUS} alt="SUS" className="logoSus" /></Link>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;