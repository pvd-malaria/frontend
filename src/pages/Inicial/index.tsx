import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Layout from '../../components/Layout';

import styles from './styles.module.scss';

import imageTaxas from './images/taxas.png';
import imageImportados from './images/importados.png';


function Inicial() {
  return (
    <Layout>
      <section className={styles.banner}>
        <div className={classnames("container", styles.container)}>
          <div className={styles.info}>
            <h4>Plataforma de <br/>Visualização de Dados</h4>
            <h1>Para auxiliar gestores, pesquisadores e público em geral a entender melhor sobre a contaminação pela malária no Brasil.</h1>
            <h2>Serviço interativo de análise de indicadores por meio de inteligência artificial.</h2>
            <h4>Diversas visualizações e criação de novas baseado em suas necessidades.</h4>
          </div>
        </div>
      </section>

      <section className={classnames("container", styles.highlight)}>
        <div className={styles.image}>
          <img src={imageTaxas} alt="Taxas"/>
        </div>
        <div className={styles.info}>
          <h4>Taxas</h4>
          <h3>Lorem ipsum dolor</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
          <Link to={'/'}>Veja mais</Link>
        </div>
      </section>

      <section className={classnames("container", styles.highlight)}>
        <div className={styles.image}>
          <img src={imageImportados} alt="Importados"/>
        </div>
        <div className={styles.info}>
          <h4>Importados</h4>
          <h3>Lorem ipsum dolor</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
          <Link to={'/'}>Veja mais</Link>
        </div>
      </section>

      <section className={classnames("container", styles.highlight, styles.visualizations)}>
        <h4>Visualizações</h4>
        <p>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <ul className="items">
          <li>
            <img src="" alt="Visualização" />
            <small>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris commodo consequat.</small>
          </li>
          <li>
            <img src="" alt="Visualização" />
            <small>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris commodo consequat.</small>
          </li>
          <li>
            <img src="" alt="Visualização" />
            <small>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris commodo consequat.</small>
          </li>
        </ul>
        <Link to="/">Mais visualizações</Link>
      </section>

      <section className={classnames("container", styles.highlight, styles.quality)}>
        <h4>Qualidade da Informação</h4>
        <p>Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur. Excepteur sintoccaecat cupidatat non proident, sunt in qui officiadeserunt mollit est laborum.</p>
      </section>

      <section className={classnames("container", styles.highlight, styles.publications)}>
        <h4>Publicações</h4>
        <article>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur.</p>
        </article>
        <article>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur.</p>
        </article>
        <Link to="/">Mais publicações</Link>
      </section>


    </Layout>
  );
}

export default Inicial;