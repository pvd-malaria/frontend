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
              .map((item) => (
                <Item
                  // @ts-ignore
                  type={item.type}
                  label={item.label}
                  title={item.title}
                />
              )
              )
          }

          {/* Hack para space-between */}
          <article className="listItem"></article>
          <article className="listItem"></article>
          <article className="listItem"></article>
        </div>
      </section>
    </Layout>
  );
}

export default VisualizacoesLista;