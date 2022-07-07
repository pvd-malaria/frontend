import { useCallback, useState } from 'react';

import Layout from '../../../../components/Layout';
import Item from './Item';

import jsonCursos from '../../../../contents/cursos.json';

import './styles.css';

function CursosLista() {
  return (
    <Layout id="pageCursosLista">
      <section className="wrapperInfo">
        <div className="container">
          <h1>{jsonCursos.page.title}</h1>
          <p>{jsonCursos.page.description}</p>
        </div>
      </section>

      <section className="wrapperList">
        <div className="container">
          {
            jsonCursos.list
              .map((item) =>
                <Item
                  key={item.id}
                  id={item.id}
                  url={item.url}
                  short={item.short}
                  title={item.title}
                />
              )
          }
        </div>
      </section>

    </Layout>
  );
}

export default CursosLista;