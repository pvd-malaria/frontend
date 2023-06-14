// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Interweave } from 'interweave';
import { AccordionDetails, AccordionSummary, Accordion, AccordionActions } from '@mui/material';

import jsonSobre from '../../contents/sobre.json';
import Layout from '../../components/Layout';

import EquipeLuciana from './images/luciana.jpg';
import EquipeCarlos from './images/carlos.png';
import EquipeBianca from './images/bianca.jpg';
import EquipeJayme from './images/jayme.jpeg';
import EquipeAlvaro from './images/alvaro.jpg';
import EquipeEverton from './images/everton.jpeg';
import EquipeTiago from './images/tiago.jpeg';
import EquipeNatalia from './images/natalia.jpg';
import EquipeVinícius from './images/vinicius.jpg';
import EquipeAdriano from './images/adriano.jpeg';
import EquipeWillianson from './images/willianson.jpg';

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
              <figure><img src={EquipeLuciana} alt="Foto Luciana" /></figure>
              <p className="nome">Profa. Dra. Luciana Correia Alves</p>
              <a className="email" href="mailto:lcalves@unicamp.br">lcalves@unicamp.br</a>
              <p className="bio">IFCH - NEPO - Unicamp</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeCarlos} alt="Foto Carlos" /></figure>
              <p className="nome">Prof. Me. Carlos Beluzo</p>
              <a className="email" href="mailto:beluzo@ifsp.edu.br">beluzo@ifsp.edu.br</a>
              <p className="bio">IFSP Campinas</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeBianca} alt="Foto Bianca" /></figure>
              <p className="nome">Bianca Cechetto Carlos</p>
              <a className="email" href="mailto:bc.carlos@unesp.br">bc.carlos@unesp.br</a>
              <p className="bio">NEPO - UNICAMP</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeJayme} alt="Foto Jayme" /></figure>
              <p className="nome">Prof. Dr. Jayme Augusto de Souza-Neto</p>
              <a className="email" href="mailto:jayme.souza-neto@unesp.br">jayme.souza-neto@unesp.br</a>
              <p className="bio">UNESP</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Pesquisadores</h4>

          <div className="listMembros">
            <div className="membro">
              <figure><img src={EquipeAlvaro} alt="Foto Alvaro" /></figure>
              <p className="nome">Prof. Dr. Álvaro de Oliveira D'Antona</p>
              <a className="email" href="mailto:adantona@unicamp.br">adantona@unicamp.br</a>
              <p className="bio">FCA - UNICAMP</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeEverton} alt="Foto Everton" /></figure>
              <p className="nome">Prof. Me. Everton Silva</p>
              <a className="email" href="mailto:everton.silva@ifsp.edu.br">everton.silva@ifsp.edu.br</a>
              <p className="bio">IFSP Campinas</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeTiago} alt="Foto Tiago" /></figure>
              <p className="nome">Prof. Dr. Tiago José de Carvalho</p>
              <a className="email" href="mailto:tiago.carvalho@inoviacorp.com">tiago.carvalho@inoviacorp.com</a>
              <p className="bio">Inovia</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeNatalia} alt="Foto Natalia" /></figure>
              <p className="nome">Natália Martins Arruda</p>
              <a className="email" href="mailto:natimarruda@gmail.com">natimarruda@gmail.com</a>
              <p className="bio">NEPO - UNICAMP</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeVinícius} alt="Foto Vinícius" /></figure>
              <p className="nome">Vinícius de Souza Maia</p>
              <a className="email" href="mailto:vinicius.de_souza_maia@ekh.lu.se">vinicius.de_souza_maia@ekh.lu.se</a>
              <p className="bio">NEPO - UNICAMP</p>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>Equipe técnica</h4>

          <div className="listMembros">
            <div className="membro">
              <figure><img src={EquipeAdriano} alt="Foto Adriano" /></figure>
              <p className="nome">Adriano Souza</p>
              <a className="email" href="mailto:silva.souza.adriano@gmail.com">silva.souza.adriano@gmail.com</a>
              <p className="bio">Analista de Desenvolvimento Web</p>
            </div>
            <div className="membro">
              <figure><img src={EquipeWillianson} alt="Foto Willianson" /></figure>
              <p className="nome">Willianson Araújo</p>
              <a className="email" target="_blank" href="https://github.com/willianson" rel="noreferrer">@willianson</a>
              <p className="bio">Cientista da Computação</p>
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
