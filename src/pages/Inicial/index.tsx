import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';

import './styles.css';

import imageTaxas from './images/taxas.png';
import imageImportados from './images/importados.png';
import imageVisualization0 from './images/visualization-0.png';
import imageVisualization1 from './images/visualization-1.png';
import imageVisualization2 from './images/visualization-2.png';


function Inicial() {
  return (
    <Layout id="pageInicial">

      <section className="banner bg-primary-gradient">
        <div className="container">
          <div className="info">
            <h2>Plataforma de <br/>Visualização de Dados</h2>
            <h1>Para auxiliar gestores, pesquisadores e público em geral a entender melhor sobre a contaminação pela malária no Brasil.</h1>
            <h4>Serviço interativo de análise de indicadores por meio de inteligência artificial.</h4>
            <h3>Diversas visualizações e criação de novas baseado em suas necessidades.</h3>
          </div>
        </div>
      </section>

      <section className="highlight">
        <div className="container">
          <div className="image">
            <img src={imageTaxas} alt="Taxas"/>
          </div>
          <div className="info">
            <h4>Taxas</h4>
            <h3>Lorem ipsum dolor</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
            <LinkButton to="/">Veja mais</LinkButton>
          </div>
        </div>
      </section>

      <section className="highlight gray">
        <div className="container">
          <div className="image">
            <img src={imageImportados} alt="Importados"/>
          </div>
          <div className="info">
            <h4>Importados</h4>
            <h3>Lorem ipsum dolor</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
            <LinkButton to="/">Veja mais</LinkButton>
          </div>
        </div>
      </section>

      <section className="visualizations">
        <div className="container">
          <h4>Visualizações</h4>
          <p>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="items">
            <article>
              <img src={imageVisualization0} alt="Visualização" />
              <small>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris commodo consequat.</small>
            </article>
            <article>
              <img src={imageVisualization1} alt="Visualização" />
              <small>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris commodo consequat.</small>
            </article>
            <article>
              <img src={imageVisualization2} alt="Visualização" />
              <small>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris commodo consequat.</small>
            </article>
          </div>
          <LinkButton to="/">Mais visualizações</LinkButton>
        </div>
      </section>

      <section className="quality bg-primary-gradient">
        <div className="quality-bg">
          <div className="container">
            <h4>Qualidade da Informação</h4>
            <p>Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur. Excepteur sintoccaecat cupidatat non proident, sunt in qui officiadeserunt <Link to="/">mollit est laborum</Link>.</p>
          </div>
        </div>
      </section>

      <section className="publications">
        <div className="container">
          <h4>Publicações</h4>
          <div className="items">
            <article>
              <Link to="/">
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur.</p>
              </Link>
            </article>
            <article>
              <Link to="/">
                <h2>Lorem ipsum dolor sit amet consectetur do eiusmo</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur.</p>
              </Link>
            </article>
          </div>
          <LinkButton to="/">Mais publicações</LinkButton>
        </div>
      </section>

    </Layout>
  );
}

export default Inicial;