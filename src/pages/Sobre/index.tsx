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
              <p className="nome">Profa. Dra. Luciana Correia Alves</p>
              <p className="email">lcalves@unicamp.br</p>
              <p className="bio">Pesquisador Principal. Chefe do Departamento de Demografia/IFCH - Universidade Estadual de Campinas.</p>
            </div>
            <div className="membro">
              <p className="nome">Prof. Me. Carlos Eduardo Beluzo</p>
              <p className="email">beluzo@ifsp.edu.br</p>
              <p className="bio">Co-PI. Professor no Instituto Federal de São Paulo na área de Informática e Ciência de Dados.</p>
            </div>
            <div className="membro">
              <p className="nome">Dra. Bianca Cechetto Carlos</p>
              <p className="email">bc.carlos@unesp.br</p>
              <p className="bio">Co-PI. Pesquisadora Visitante da UNESP. Bacharelado e Mestrado em Ciências Biológicas, Doutora em Ciências na área Biologia da Relação 
                Patógeno-Hospedeiro, e Pós-doc atuando com malária.</p>
            </div>
            <div className="membro">
              <p className="nome">Prof. Dr. Jayme Augusto de Souza-Neto</p>
              <p className="email">jaysneto@gmail.com</p>
              <p className="bio">Co-PI. Professor Assistente de Genômica Funcional da UNESP. Geneticista e Virologista atuando com Saúde e Bióloga Molecular. Atualmente é Cientista Sênior na CEEZAD/K-State University.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Pesquisadores</h4>

          <div className="listMembros">
            <div className="membro">
              <p className="nome">Prof. Dr. Álvaro de Oliveira D'Antona</p>
              <p className="email">alvaro.dantona@fca.unicamp.br</p>
              <p className="bio">Professor e Diretor Associado da Faculdade de Ciências Aplicadas da Unicamp. 
                Formação em Ciências Humanas, Ciências Sociais Aplicadas, Economia, Antropologia, e, População e Ambiente.</p>
            </div>
            <div className="membro">
              <p className="nome">Everton Josué da Silva</p>
              <p className="email">evertonjsilva31@gmail.com</p>
              <p className="bio">Pesquisadora Associada e Cientista de Dados. Professor no Instituto Federal de São Paulo na área de Informática e Ciência de Dados.</p>
            </div>
            <div className="membro">
              <p className="nome">Prof. Dr. Tiago José de Carvalho</p>
              <p className="email">tiagojc@gmail.com</p>
              <p className="bio">Professor no Instituto Federal de São Paulo na área de Informática e Ciência de Dados.</p>
            </div>
            <div className="membro">
              <p className="nome">Natália Martins Arruda</p>
              <p className="email">natimarruda@gmail.com</p>
              <p className="bio">Pesquisadora Associada e Cientista de Dados. Bacharel em Economia e Mestre em Demografia pela UNICAMP.</p>
            </div>
            <div className="membro">
              <p className="nome">Vinícius de Souza Maia</p>
              <p className="email">viniciusmaia108@gmail.com</p>
              <p className="bio">Pesquisador Associado. Bacharel em Ciências Sociais e Mestre em Demografia pela UNICAMP.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Equipe técnica</h4>

          <div className="listMembros">
            <div className="membro">
              <p className="nome">Adriano Souza</p>
              <p className="email">silva.souza.adriano@gmail.com</p>
              <p className="bio">Analista de Desenvolvimento Web</p>
            </div>
            <div className="membro">
              <p className="nome">Willianson Araújo</p>
              <p className="email">contato@willianson.com.br</p>
              <p className="bio">Analista de Desenvolvimento Web</p>
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
