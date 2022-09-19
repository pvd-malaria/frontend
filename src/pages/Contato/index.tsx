// import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';

import './styles.css';


function Contato() {
  return (
    <Layout id="pageContato">

      <section className="conteudo">
        <div className="container">
          <h1>Fale conosco</h1>

          <h2>LADDEM</h2>
          <h4>Laboratório de Análise de Dados em Demografia</h4>
          
          <h2>UNICAMP</h2>
          <h4>Universidade Estadual de Campinas</h4>
          <div className="info">
            <address>
              Núcleo de Estudos de População "Elza Berquó"<br/>
              Av. Albert Einstein, 1300, sala 25<br/>
              Cidade Universitária Zeferino Vaz<br/>
              CEP 13083-852 - Campinas/SP
            </address>
            <p>
              E-mail: laddem.unicamp@gmail.com
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
}

export default Contato;