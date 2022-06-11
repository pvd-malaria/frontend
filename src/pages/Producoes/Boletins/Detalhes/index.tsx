import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import DOMPurify from 'dompurify';

import Layout from '../../../../components/Layout';

import jsonBoletins from '../../../../contents/boletins.json';
import LinkButton from '../../../../components/LinkButton';

import './styles.css';


interface IBoletim {
  id: string,
  url: string,
  title: string,
  short: string,
}


function BoletinsDetalhes() {

  const [ boletim, setBoletim ] = useState<IBoletim>();
  const [ htmlContent, setHtmlContent ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const { id } = useParams<"id">();


  const importContent = useCallback(async(file) => {
    setLoading(true);
    const headers = { 'Content-Type': 'Content-Type: text/html; charset=UTF-8' };
    const response = await fetch(`${file}`, { headers });
    const html = await response.text();
    setHtmlContent(html);
    setLoading(false);
  }, [ setHtmlContent, setLoading ]);


  useEffect(() => {
    const [ filteredItem ] = jsonBoletins.list.filter(item => item.id === id);
    console.log(filteredItem)
    if (filteredItem) {
      importContent(filteredItem.file);
      setBoletim(filteredItem);
    }
  }, [id, importContent, setBoletim]);


  // loading 
  if (loading) {
    return (
      <Layout id="pageBoletinsDetalhes">
        <div className="container loading">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  // Detalhes
  if (boletim) {
    return (
      <Layout id="pageBoletinsDetalhes">
        <section className="wrapperHeader">
          <div className="container">
            <h1>{boletim.title}</h1>
          </div>
        </section>      

        <section className="wrapperBoletim">
          <div className="container">
            <div className="boletim">
              <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>
            </div>

            <LinkButton
              style="none"
              to="/producoes/boletins"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para lista de boletins
            </LinkButton>
          </div>
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout id="pageBoletinsDetalhes">
          <div className="container">
            <h2>Ops... :(</h2>
            <p>O boletim solicitado não foi encontrada.</p>
            <br />

            <LinkButton
              style="none"
              to="/producoes/boletins"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para lista de boletins
            </LinkButton>
          </div>
      </Layout>
    );
  }

}

export default BoletinsDetalhes;