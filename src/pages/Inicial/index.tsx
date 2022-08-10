import { Link } from 'react-router-dom';
import { Interweave } from 'interweave';

import jsonInicial from '../../contents/inicial.json';

import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';

import './styles.css';

import imageTaxas from './images/taxas.png';
import imageImportados from './images/importados.png';
import imageVisualizationFirst from '../Visualizacoes/Lista/Item/images/bubbles.svg';
import imageVisualizationSecond from '../Visualizacoes/Lista/Item/images/lines-filled-full.svg';
import imageVisualizationThird from '../Visualizacoes/Lista/Item/images/bars-filled-full.svg';


function Inicial() {
  return (
    <Layout id="pageInicial">

      <section className="banner bg-primary-gradient">
        <div className="banner-bg-image">
          <div className="container">
            <div className="info">
              <h2>{jsonInicial.banner.title}</h2>
              <Interweave noWrap content={jsonInicial.banner.description} />
            </div>
          </div>
        </div>
      </section>

      <section className="highlight">
        <div className="container">
          <div className="image">
            <img src={imageTaxas} alt="Taxas"/>
          </div>
          <div className="info">
            <h4>{jsonInicial.taxas.title}</h4>
            <h3>{jsonInicial.taxas.short}</h3>
            <p>{jsonInicial.taxas.description}</p>
            <LinkButton to={jsonInicial.taxas.url}>Veja mais</LinkButton>
          </div>
        </div>
      </section>


      <section className="highlight gray">
        <div className="container">
          <div className="image">
            <img src={imageImportados} alt="Importados"/>
          </div>
          <div className="info">
            <h4>{jsonInicial.importados.title}</h4>
            <h3>{jsonInicial.importados.short}</h3>
            <p>{jsonInicial.importados.description}</p>
            <LinkButton to={jsonInicial.importados.url}>Veja mais</LinkButton>
          </div>
        </div>
      </section>

      <section className="visualizations">
        <div className="container">
          <h4>{jsonInicial.visualizacoes.title}</h4>
          <p>{jsonInicial.visualizacoes.description}</p>
          <div className="items">
            <article>
              <Link to={jsonInicial.visualizacoes.items[0].url}>
                <img src={imageVisualizationFirst} alt="Visualização" />
                <h3>{jsonInicial.visualizacoes.items[0].title}</h3>
                <span>{jsonInicial.visualizacoes.items[0].short}</span>
              </Link>
            </article>
            <article>
              <Link to={jsonInicial.visualizacoes.items[1].url}>
                <img src={imageVisualizationSecond} alt="Visualização" />
                <h3>{jsonInicial.visualizacoes.items[1].title}</h3>
                <span>{jsonInicial.visualizacoes.items[1].short}</span>
              </Link>
            </article>
            <article>
              <Link to={jsonInicial.visualizacoes.items[2].url}>
                <img src={imageVisualizationThird} alt="Visualização" />
                <h3>{jsonInicial.visualizacoes.items[2].title}</h3>
                <span>{jsonInicial.visualizacoes.items[2].short}</span>
              </Link>
            </article>
          </div>
          <LinkButton to={jsonInicial.visualizacoes.url}>Veja todas visualizações</LinkButton>
        </div>
      </section>

      <section className="quality bg-primary-gradient">
        <div className="quality-bg">
          <div className="container">
            <h4>{jsonInicial.qualidade_da_informacao.title}</h4>
            <p>{jsonInicial.qualidade_da_informacao.description}</p>
          </div>
        </div>
      </section>

      <section className="publications">
        <div className="container">
          <h4>{jsonInicial.publicacoes.title}</h4>
          <div className="items">
            <article>
              <Link to={jsonInicial.publicacoes.items[1].url}>
                <h2>{jsonInicial.publicacoes.items[1].title}</h2>
                <p>{jsonInicial.publicacoes.items[1].short}</p>
              </Link>
            </article>
            <article>
              <Link to={jsonInicial.publicacoes.items[2].url}>
                <h2>{jsonInicial.publicacoes.items[2].title}</h2>
                <p>{jsonInicial.publicacoes.items[2].short}</p>
              </Link>
            </article>
          </div>
          <LinkButton to={jsonInicial.publicacoes.url}>Veja todas publicações</LinkButton>
        </div>
      </section>
    </Layout>
  );
}

export default Inicial;