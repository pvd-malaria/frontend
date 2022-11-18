// import { useContext } from 'react';
import jsonReferencias from '../../../contents/referencias.json';
import Layout from '../../../components/Layout';

import './styles.css';


function Referencias() {
  return (
    <Layout id="pageReferencias">

      <section className="conteudo">
        <div className="container">
          <h1>Referências</h1>

          {jsonReferencias.list.map(item => 
            <article>
              <span>{item.short}</span>
              <a href={item.url}>Ver</a>
            </article>
          )}

        </div>
      </section>

    </Layout>
  );
}

export default Referencias;