import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
            <h1>{visualization.title}</h1>
            <p>{visualization.description}</p>
          </div>
        </section>      

        <section className="wrapperVisualization">
          <div className="container">
            <iframe 
              title={visualization.title}
              src={`/visualizations/${visualization.file}`}
              width="100%"  
              height="700px"
              frameBorder="0"
            ></iframe>

            <LinkButton
              style="none"
              to="/visualizacoes#header"
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
            <p>Nenhum registro encontrado.</p>
          </div>
        {/* </section> */}
      </Layout>
    );
  }

}

export default VisualizacoesDetalhes;