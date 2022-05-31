import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';

import Layout from '../../../components/Layout';

import jsonVisualizacoes from '../../../contents/visualizacoes.json';
import LinkButton from '../../../components/LinkButton';

import './styles.css';


interface IVisualization {
  id: string,
  url: string,
  type: string,
  label: string,
  title: string,
  description: string,
  file: string,
}


function VisualizacoesDetalhes() {

  const [ visualization, setVisualization ] = useState<IVisualization>();
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
            <Link to="/visualizacoes">Galeria de visualizações</Link>
            <h1>{visualization.title}</h1>
            <p>{visualization.description}</p>
          </div>
        </section>      

        <section className="wrapperVisualization">
          <div className="container">
            <div className="visualization">
              <CircularProgress />

              <iframe 
                title={visualization.title}
                src={`/visualizations/${visualization.file}`}
                width="100%"  
                height="700px"
                frameBorder="0"
                scrolling="no"
                sandbox="allow-forms allow-scripts"
              >
              </iframe>
            </div>

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
        {/* <section className="wrapperInfo"> */}
          <div className="container">
            <p>Visualização não encontrada.</p>
          </div>
        {/* </section> */}
      </Layout>
    );
  }

}

export default VisualizacoesDetalhes;