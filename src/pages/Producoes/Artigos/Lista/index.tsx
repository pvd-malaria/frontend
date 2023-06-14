import Layout from '../../../../components/Layout';
import Item from './Item';

import jsonArtigos from '../../../../contents/artigos.json';

import './styles.css';


function ArtigosLista() {
  return (
    <Layout id="pageArtigosLista">
      <section className="wrapperInfo">
        <div className="container">
          <h1>{jsonArtigos.page.title}</h1>
          <p>{jsonArtigos.page.description}</p>
        </div>
      </section>

      <section className="wrapperList">
        <div className="container">
          {
            jsonArtigos.list
              .map((item) =>
                <Item
                  date={item.date}
                  key={item.id}
                  linkTo={item.url}
                  short={item.short}
                  title={item.title}
                  pdf={item.file}
                  urlPdf={item.urlPdf}
                  urlExternal={item.urlExternal}
                  id={item.id}
                />
              )
          }

          {/* Hack para space-between */}
          <article className="listItem"></article>
        </div>
      </section>

    </Layout>
  );
}

export default ArtigosLista;