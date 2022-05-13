import LinkButton from '../../../components/LinkButton';

import Layout from '../../../components/Layout';
import Item from './Item';

import jsonVisualizacoes from '../../../contents/visualizacoes.json';

import './styles.css';


function VisualizacoesLista() {
  return (
    <Layout id="pageVisualizacoesLista">
      <section className="wrapperInfo">
        <div className="container">
          <h1>{jsonVisualizacoes.page.title}</h1>
          <p>{jsonVisualizacoes.page.description}</p>
        </div>
      </section>

      <section className="wrapperList">
        <div className="container">
          {
            jsonVisualizacoes.gallery
              .map((item) =>
                <Item
                  // @ts-ignore
                  type={item.type}
                  title={item.title}
                  label={item.label}
                  linkTo={item.url}
                />
              )
          }

          {/* Hack para space-between */}
          <article className="listItem"></article>
          <article className="listItem"></article>
          <article className="listItem"></article>
        </div>
      </section>

      <section className="wrapperQuality bg-primary-gradient">
        <div className="container">
          <h2>{jsonVisualizacoes.quality.title}</h2>
          <p>{jsonVisualizacoes.quality.description}</p>
          <LinkButton to={jsonVisualizacoes.quality.url} className="outlined white">Veja mais</LinkButton>
        </div>
      </section>
    </Layout>
  );
}

export default VisualizacoesLista;