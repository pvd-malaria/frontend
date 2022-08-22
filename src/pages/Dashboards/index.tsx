import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Button from '@mui/material/Button';
import { Interweave } from 'interweave';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import Layout from '../../components/Layout';

import jsonDashboards from '../../contents/dashboards.json';
import LinkButton from '../../components/LinkButton';
import Fullscreen from '../../components/Fullscreen';

import './styles.css';


interface IDashboard {
  id: string,
  title: string,
  description: string[],
  height: number;
  file: string,
  url: string,
}


function Dashboards() {

  const { id } = useParams<"id">();
  const location = useLocation();

  const [ dashboard, setDashboard ] = useState<IDashboard | undefined>();
  const [ open, setOpen ] = useState<boolean>(false);
  const [ showIframe, setShowIframe ] = useState<boolean>(false);


  const fullscreenHandle = useCallback(() => {
    const elementToOpen = document.querySelector('#iframeDashboard');
    Fullscreen(elementToOpen)
  }, []);


  const onLoadDashboardFrame = useCallback((event) => {
    setShowIframe(true);
  }, []);


  useEffect(() => {
    const filteredItem = jsonDashboards.gallery.filter(item => item.id === id);
    if (filteredItem.length > 0) {
      setDashboard(filteredItem[0]);
    }
  }, [id]);


  useEffect(() => {
    setOpen(false);
    return () => {
      console.log('unmount');
      setShowIframe(false);
    };
  }, [location]);


  if (dashboard){
    return (
      <Layout id="pageDashboards">
        <section className="wrapperInfo">
          <div className="container">
            <h1>{dashboard.title}</h1>
            <Interweave noWrap content={dashboard.description[0]} />
            {
              dashboard.description.length > 1
              &&
                <Accordion expanded={open}>
                  <AccordionSummary onClick={() => setOpen(true)}>Ler mais</AccordionSummary>
                  <AccordionDetails>
                      <Interweave noWrap content={dashboard.description[1]} />
                  </AccordionDetails>
                </Accordion>
            }
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
                height={dashboard.height}
                style={{ opacity: showIframe ? 1 : 0 }}
                onLoad={onLoadDashboardFrame}
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
      <Layout id="pageDashboards">
          <div className="container">
            <h2>Ops... :(</h2>
            <p>O dashboard solicitado não foi encontrado.</p>
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