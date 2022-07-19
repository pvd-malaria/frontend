import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import Layout from '../../components/Layout';

import jsonDashboards from '../../contents/dashboards.json';
import LinkButton from '../../components/LinkButton';
import Fullscreen from '../../components/Fullscreen';

import './styles.css';
import Button from '@mui/material/Button';


interface IDashboard {
  id: string,
  title: string,
  description: string,
  file: string,
  url: string,
}


function Dashboards() {

  const [ dashboard, setDashboard ] = useState<IDashboard>();
  const { id } = useParams<"id">();


  const fullscreenHandle = useCallback(() => {
    const elementToOpen = document.querySelector('#iframeDashboard');
    Fullscreen(elementToOpen)
  }, []);


  useEffect(() => {
    const filteredItem = jsonDashboards.gallery.filter(item => item.id === id);
    if (filteredItem.length > 0) {
      setDashboard(filteredItem[0]);
    }
  }, [id, setDashboard]);


  if (dashboard) {
    return (
      <Layout id="pageDashboards">
        <section className="wrapperInfo">
          <div className="container">
            <h1>
              <span>Dashboards</span><br />
              {dashboard.title}
            </h1>
            <p>{dashboard.description}</p>
          </div>
        </section>      

        <section className="wrapperDashboard">
          <div className="container">
            <div className="dashboard">
              <CircularProgress />

              <iframe 
                id="iframeDashboard"
                title={dashboard.title}
                src={dashboard.url}
                // TODO: src={`/visualizacoes/${dashboard.file}`}
                width="100%"  
                height="800"
                frameBorder="0"
                scrolling="no"
                sandbox="allow-forms allow-scripts allow-downloads allow-same-origin allow-forms"
              >
              </iframe>
            </div>

            <Button variant="contained" onClick={fullscreenHandle}>
              <FullscreenIcon/> &nbsp; 
              Exibir em tela cheia
            </Button>
            <p><i>Em modo tela cheira, pressione ESC para voltar.</i></p>
          </div>
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout id="pageDashboard">
          <div className="container">
            <h2>Ops... :(</h2>
            <p>O dashboard solicitado não foi encontrada.</p>
            <br />

            <LinkButton
              style="none"
              to="/visualizacoes"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para página inicial
            </LinkButton>
          </div>
      </Layout>
    );
  }

}

export default Dashboards;