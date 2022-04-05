import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Layout from '../../components/Layout';

import styles from './styles.module.scss';


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

      <section className="container destaque taxas">
        <h4>Taxas</h4>
        <h3>Lorem ipsum dolor</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
        <Link to={'/'}>Veja mais</Link>
      </section>

      <section className="container destaque taxas">
        <h4>Importados</h4>
        <h3>Lorem ipsum dolor</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
        <Link to={'/'}>Veja mais</Link>
      </section>

      <section className="container visualizacoes">
        <h4>Visualizações</h4>
        <p>Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>
    </Layout>
  );
}

export default Inicial;