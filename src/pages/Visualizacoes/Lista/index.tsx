import { useContext } from 'react';

import { AppContext } from '../../../contexts/AppContext';
import Layout from '../../../components/Layout';
import Item from './Item';

import './styles.css';


function VisualizacoesLista() {

  const { getHtmlFromContents, getItemFromContents } = useContext(AppContext);

  return (
    <Layout id="pageVisualizacoesLista">
      <section className="infoWrapper">
        <div className="container">
          <h1>Galeria de visualizações</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod 
            tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </section>

      <section className="listWrapper">
        <div className="container">
          
          <Item
            type="barsFilledFull"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="barsHorizontal"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="bubbles"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="donuts"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="lines"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="linesFilled"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="linesFilledFull"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="mapNetwork"
            label="Relação"
            title="Caso de Malária"
          />

          <Item
            type="mountain"
            label="Relação"
            title="Caso de Malária"
          />

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