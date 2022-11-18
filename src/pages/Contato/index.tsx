// import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';

import './styles.css';


function Contato() {
  return (
    <Layout id="pageContato">

      <section className="conteudo">
        <div className="container">
          <h1>LADDEM</h1>
          <h2>Laboratório de Análise de Dados em Demografia</h2>
          <p>
            <strong>E-mail:</strong> laddem.unicamp@gmail.com
          </p>
          
          <br />

          <h2>UNICAMP - Universidade Estadual de Campinas</h2>
          <div className="info">
            <address>
              <strong>Núcleo de Estudos de População "Elza Berquó"</strong><br/>
              Av. Albert Einstein, 1300, sala 25<br/>
              Cidade Universitária Zeferino Vaz<br/>
              CEP: 13083-852 <br/>
              Campinas, SP
            </address>
          </div>

          <iframe
            id="frameMapa"
            width="100%"
            height="500"
            frameBorder="0"
            scrolling="no"
            src="https://maps.google.com/maps?q=N%C3%BAcleo%20de%20Estudos%20de%20Popula%C3%A7%C3%A3o%20%22Elza%20Berqu%C3%B3%22%20Av.%20Albert%20Einstein,%201300,%20sala%2025%20Cidade%20Universit%C3%A1ria%20Zeferino%20Vaz%20CEP%2013083-852%20-%20Campinas/SP&t=&z=15&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
      </section>

    </Layout>
  );
}

export default Contato;