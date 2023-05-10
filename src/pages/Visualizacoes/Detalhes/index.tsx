import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';

import Layout from '../../../components/Layout';

import jsonVisualizacoes from '../../../contents/visualizacoes.json'; //ALTERAR O DOMINIO NA url DENTRO DO JSON QUANDO O PROJETO MUDAR DE INFRAESTRUTURA
import LinkButton from '../../../components/LinkButton';

import './styles.css';

interface IFile {
  title: string;
  file: string; //ALTERAR O DOMINIO NA url DENTRO DO JSON QUANDO O PROJETO MUDAR DE INFRAESTRUTURA
  height: number; 
}

interface IVisualization {
  id: string;
  url: string;
  type: string;
  label: string;
  title: string;
  description: string;
  files: IFile[];
}


function VisualizacoesDetalhes() {

  const [ visualization, setVisualization ] = useState<IVisualization>(); //ALTERAR O DOMINIO NA url DENTRO DO JSON QUANDO O PROJETO MUDAR DE INFRAESTRUTURA
  const { id } = useParams<"id">();


  useEffect(() => {
    const filteredItem = jsonVisualizacoes.gallery.filter(item => item.id === id);
    if (filteredItem.length > 0) {
      setVisualization(filteredItem[0]);
    }
  }, [id, setVisualization]);


  if (visualization) {
    return (
      <Layout id="pageVisualizacoesDetalhes">
        <section className="wrapperInfo">
          <div className="container">
            {/* <Link to="/visualizacoes">Galeria de visualizações</Link> */}
            <h1>{visualization.title}</h1>
            <p>{visualization.description}</p>
          </div>
        </section>      

        <section className="wrapperVisualization">
          <div className="container">
            {
              visualization.files && visualization.files.map(filesItem => (
                  <div className="visualization">
                    <CircularProgress />

                    <iframe 
                      title={filesItem.title}
                      src={ filesItem.file.includes('http') ? filesItem.file : `/visualizacoes/${filesItem.file}`}
                      width="100%"  
                      height={filesItem.height}
                      frameBorder="0"
                      scrolling="no"
                      sandbox="allow-forms allow-scripts allow-downloads allow-same-origin allow-forms"
                    >
                    </iframe>
                  </div>
                ))
            }

            <LinkButton
              style="none"
              to="/visualizacoes"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para visualizações
            </LinkButton>
          </div>
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout id="pageVisualizacoesDetalhes">
          <div className="container">
            <h2>Ops... :(</h2>
            <p>A visualização solicitada não foi encontrada.</p>
            <br />

            <LinkButton
              style="none"
              to="/visualizacoes"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para visualizações
            </LinkButton>
          </div>
      </Layout>
    );
  }

}

export default VisualizacoesDetalhes;