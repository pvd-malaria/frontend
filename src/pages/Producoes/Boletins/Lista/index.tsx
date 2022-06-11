import Layout from '../../../../components/Layout';
import Item from './Item';

import jsonBoletins from '../../../../contents/boletins.json';

import './styles.css';


function BoletinsLista() {
  return (
    <Layout id="pageBoletinsLista">
      <section className="wrapperInfo">
        <div className="container">
          <h1>{jsonBoletins.page.title}</h1>
          <p>{jsonBoletins.page.description}</p>
        </div>
      </section>

      <section className="wrapperList">
        <div className="container">
          {
            jsonBoletins.list
              .map((item) =>
                <Item
                  key={item.id}
                  linkTo={item.url}
                  short={item.short}
                  title={item.title}
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

export default BoletinsLista;