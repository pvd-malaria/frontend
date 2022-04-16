import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';

import './styles.css';


function Sobre() {
  return (
    <Layout id="pageSobre">

      <section className="resumo">
        <div className="container">
          <h1>Sobre o projeto Malária</h1>
          <div className="info">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do 
              eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad
              ad minim veniam, quis ea commodo consequat. Duis aute irure dolor 
              in reprehenderit in voluptate.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, 
              odio repellat itaque molestiae laboriosam corrupti, recusandae voluptates ad
              commodi quo porro soluta ullam veritatis quisquam amet? Pariatur 
              consequuntur fuga velit beatae.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi 
              mollitia odit molestias commodi iste fugit eius pariatur hic quos ad
              sequi ipsam beatae nemo vero ad, suscipit earum quisquam expedita 
              quod? sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias 
              possimus ipsum rem adipisci unde dolore odio! Enim eaque sapiente ad
              explicabo blanditiis nisi sequi ullam, sit odit quam aliquid temporibus 
              deleniti?
            </p>
          </div>
        </div>
      </section>

      <section className="equipe">
        <div className="container">
          <h2>Sobre a equipe</h2>
          <div className="info">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod 
              tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim 
              veniam, quis nostrud exercitationullamco.
            </p>
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
          <h1>Conheça o projeto</h1>
          <div className="info">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do 
              eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad
              ad minim veniam, quis ea commodo consequat. Duis aute irure dolor 
              in reprehenderit in voluptate.
            </p>
            <p>
              <Link to="#">Lorem ipsum dolor</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Sobre;