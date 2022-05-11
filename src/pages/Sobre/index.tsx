// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Interweave } from 'interweave';

import jsonSobre from '../../contents/sobre.json';

import Layout from '../../components/Layout';

import './styles.css';


function Sobre() {
  return (
    <Layout id="pageSobre">

      <section className="resumo">
        <div className="container">
          <h1>{jsonSobre.page.title}</h1>
          <div className="info">
            <Interweave noWrap content={jsonSobre.page.description} />
          </div>
        </div>
      </section>

      <section className="equipe">
        <div className="container">
          <h2>{jsonSobre.equipe.title}</h2>
          <div className="info">
            <p>{jsonSobre.equipe.description}</p>
          </div>
        </div>

        <div className="container">
          <h4>Pesquisadores principais</h4>

          <div className="listMembros">
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Luciana Alves</p>
              <p className="email">lcalves@synapse.org</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Carlos Eduardo Beluzo</p>
              <p className="email">cbeluzo@synapse.org</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Bianca</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Jaime</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Equipe científica</h4>

          <div className="listMembros">
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Alvaro</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Everton</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Tiago</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Natalia</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Vinicius</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Equipe técnica</h4>

          <div className="listMembros">
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Adriano</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Raquel</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
            <div className="membro">
              <div className="foto"></div>
              <p className="nome">Rogério</p>
              <p className="email">endereco@mail.com</p>
              <p className="bio">Informação complementar</p>
            </div>
          </div>
        </div>
      </section>

      <section className="convite">
        <div className="container">
          <h1>{jsonSobre.projeto.title}</h1>
          <div className="info">
            <Interweave noWrap content={jsonSobre.projeto.description} />
            <p>
              <Link to={jsonSobre.projeto.url}>Lorem ipsum dolor</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Sobre;