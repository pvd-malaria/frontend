import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';

import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';

import './styles.css';

import imageTaxas from './images/taxas.png';
import imageImportados from './images/importados.png';
import imageVisualization0 from './images/visualization-0.png';
import imageVisualization1 from './images/visualization-1.png';
import imageVisualization2 from './images/visualization-2.png';


function Inicial() {

  const { getHtmlFromContents, getItemFromContents } = useContext(AppContext);
  
  return (
    <Layout id="pageInicial">

      <section className="banner bg-primary-gradient">
        <div className="banner-bg-image">
          <div className="container">
            <div className="info">
              <h2>{getHtmlFromContents('pagina_inicial_banner', 'title')}</h2>
              {getHtmlFromContents('pagina_inicial_banner', 'description')}
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
            <h4>{getItemFromContents('pagina_inicial_taxas', 'title')}</h4>
            <h3>{getItemFromContents('pagina_inicial_taxas', 'short')}</h3>
            <p>{getItemFromContents('pagina_inicial_taxas', 'description')}</p>
            <LinkButton to={getItemFromContents('pagina_inicial_taxas', 'url')}>Veja mais</LinkButton>
          </div>
        </div>
      </section>

      <section className="highlight gray">
        <div className="container">
          <div className="image">
            <img src={imageImportados} alt="Importados"/>
          </div>
          <div className="info">
            <h4>{getItemFromContents('pagina_inicial_importados', 'title')}</h4>
            <h3>{getItemFromContents('pagina_inicial_importados', 'short')}</h3>
            <p>{getItemFromContents('pagina_inicial_importados', 'description')}</p>
            <LinkButton to={getItemFromContents('pagina_inicial_importados', 'url')}>Veja mais</LinkButton>
          </div>
        </div>
      </section>

      <section className="visualizations">
        <div className="container">
          <h4>{getItemFromContents('pagina_inicial_visualizacoes', 'title')}</h4>
          <p>{getItemFromContents('pagina_inicial_visualizacoes', 'description')}</p>
          <div className="items">
            <article>
              <img src={imageVisualization0} alt="Visualização" />
              <strong>{getItemFromContents('pagina_inicial_visualizacoes_1a', 'title')}</strong>
              <span>{getItemFromContents('pagina_inicial_visualizacoes_1a', 'short')}</span>
            </article>
            <article>
              <img src={imageVisualization1} alt="Visualização" />
              <strong>{getItemFromContents('pagina_inicial_visualizacoes_2a', 'title')}</strong>
              <span>{getItemFromContents('pagina_inicial_visualizacoes_2a', 'short')}</span>
            </article>
            <article>
              <img src={imageVisualization2} alt="Visualização" />
              <strong>{getItemFromContents('pagina_inicial_visualizacoes_3a', 'title')}</strong>
              <span>{getItemFromContents('pagina_inicial_visualizacoes_3a', 'short')}</span>
            </article>
          </div>
          <LinkButton to={getItemFromContents('pagina_inicial_visualizacoes', 'url')}>Mais visualizações</LinkButton>
        </div>
      </section>

      <section className="quality bg-primary-gradient">
        <div className="quality-bg">
          <div className="container">
            <h4>{getItemFromContents('pagina_inicial_qualidade_da_informacao', 'title')}</h4>
            <p>{getItemFromContents('pagina_inicial_qualidade_da_informacao', 'description')}</p>
          </div>
        </div>
      </section>

      <section className="publications">
        <div className="container">
          <h4>{getItemFromContents('pagina_inicial_publicacoes', 'title')}</h4>
          <div className="items">
            <article>
              <Link to="{getItemFromContents('pagina_inicial_publicacoes_1', 'url')}">
                <h2>{getItemFromContents('pagina_inicial_publicacoes_1', 'title')}</h2>
                <p>{getItemFromContents('pagina_inicial_publicacoes_1', 'short')}</p>
              </Link>
            </article>
            <article>
              <Link to="{getItemFromContents('pagina_inicial_publicacoes_2', 'url')}">
                <h2>{getItemFromContents('pagina_inicial_publicacoes_2', 'title')}</h2>
                <p>{getItemFromContents('pagina_inicial_publicacoes_2', 'short')}</p>
              </Link>
            </article>
          </div>
          <LinkButton to={getItemFromContents('pagina_inicial_publicacoes', 'url')}>Mais publicações</LinkButton>
        </div>
      </section>

    </Layout>
  );
}

export default Inicial;