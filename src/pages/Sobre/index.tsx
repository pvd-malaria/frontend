// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Interweave } from 'interweave';
import { AccordionDetails, AccordionSummary, Accordion, AccordionActions } from '@mui/material';

import jsonSobre from '../../contents/sobre.json';

import Layout from '../../components/Layout';

import './styles.css';


function Sobre() {
  return (
    <Layout id="pageSobre">

      <section className="resumo">
        <div className="container">
          <h1>{jsonSobre.page.title}</h1>
          <div className="info">
            <Interweave noWrap content={jsonSobre.page.description[0]} />
            <Accordion>
              <AccordionSummary>Ler mais</AccordionSummary>
              <AccordionDetails>
                  <Interweave noWrap content={jsonSobre.page.description[1]} />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="equipe">
        <div className="container">
          <h2>{jsonSobre.equipe.title}</h2>
          <div className="info">
            <p>{jsonSobre.equipe.description}</p>
          </div>
        </div>

        <div className="container">
          <h4>Pesquisadores principais</h4>

          <div className="listMembros">
            <div className="membro">
              <p className="nome">Luciana Correia Alves</p>
              <p className="email">lcalves@unicamp.br</p>
              <p className="bio">Unicamp</p>
            </div>
            <div className="membro">
              <p className="nome">Carlos Eduardo Beluzo</p>
              <p className="email">cbeluzo@synapse.org</p>
              <p className="bio">IFSP-Campinas | Unicamp</p>
            </div>
            <div className="membro">
              <p className="nome">Bianca Cechetto Carlos</p>
              <p className="email">---</p>
              <p className="bio">UNESP</p>
            </div>
            <div className="membro">
              <p className="nome">Jayme Augusto de Souza-Neto</p>
              <p className="email">---</p>
              <p className="bio">UNESP</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Pesquisadores</h4>

          <div className="listMembros">
            <div className="membro">
              <p className="nome">Álvaro de Oliveira D'Antona</p>
              <p className="email">---</p>
              <p className="bio">Unicamp</p>
            </div>
            <div className="membro">
              <p className="nome">Everton Josué da Silva</p>
              <p className="email">---</p>
              <p className="bio">IFSP-Campinas | Unicamp</p>
            </div>
            <div className="membro">
              <p className="nome">Tiago José de Carvalho</p>
              <p className="email">---</p>
              <p className="bio">---</p>
            </div>
            <div className="membro">
              <p className="nome">Natália Martins Arruda</p>
              <p className="email">---</p>
              <p className="bio">FIOCRUZ | Unicamp</p>
            </div>
            <div className="membro">
              <p className="nome">Vinícius de Souza Maia</p>
              <p className="email">---</p>
              <p className="bio">---</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Equipe técnica</h4>

          <div className="listMembros">
            <div className="membro">
              <p className="nome">Adriano Souza</p>
              <p className="email">---</p>
              {/* <p className="bio">Analista de Desenvolvimento Web</p> */}
            </div>
            <div className="membro">
              <p className="nome">Willianson Araújo</p>
              <p className="email">contato@willianson.com.br</p>
              {/* <p className="bio">Cientista da Computação</p> */}
            </div>
          </div>
        </div>
      </section>

      <section className="convite">
        <div className="container">
          <h1>{jsonSobre.projeto.title}</h1>
          <div className="info">
            <Interweave noWrap content={jsonSobre.projeto.description} />
            {/* <p>
              <Link to={jsonSobre.projeto.url}>Lorem ipsum dolor</Link>
            </p> */}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Sobre;