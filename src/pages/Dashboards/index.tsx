import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';

import Layout from '../../components/Layout';

import jsonDashboards from '../../contents/dashboards.json';
import LinkButton from '../../components/LinkButton';

import './styles.css';


interface IDashboard {
  id: string,
  title: string,
  description: string,
  file: string,
}


function Dashboards() {

  const [ dashboard, setDashboard ] = useState<IDashboard>();
  const { id } = useParams<"id">();


  useEffect(() => {
    const filteredItem = jsonDashboards.gallery.filter(item => item.id === id);
    if (filteredItem.length > 0) {
      setDashboard(filteredItem[0]);
    }
  }, [id, setDashboard]);


  if (dashboard) {
    return (
      <Layout id="pageDashboard">
        <section className="wrapperInfo">
          <div className="container">
            <h1>{dashboard.title}</h1>
            <p>{dashboard.description}</p>
          </div>
        </section>      

        <section className="wrapperDashboard">
          <div className="container">
            <div className="dashboard">
              <CircularProgress />

              <iframe 
                title={dashboard.title}
                src={`/visualizacoes/${dashboard.file}`}
                width="100%"  
                height="700"
                frameBorder="0"
                scrolling="no"
                sandbox="allow-forms allow-scripts allow-downloads allow-same-origin allow-forms"
              >
              </iframe>
            </div>
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