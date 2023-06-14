import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';
import DOMPurify from 'dompurify';
import LinkIcon from '@mui/icons-material/Link';

import Layout from '../../../../components/Layout';

import jsonArtigos from '../../../../contents/artigos.json';
import LinkButton from '../../../../components/LinkButton';

import './styles.css';


interface IArtigo {
  id: string,
  url: string,
  urlPdf: string,
  urlExternal: string,
  date: string,
  title: string,
  short: string,
}


function ArtigosDetalhes() {

  const [ artigo, setArtigo ] = useState<IArtigo>();
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
    const [ filteredItem ] = jsonArtigos.list.filter(item => item.id === id);
    console.log(filteredItem)
    if (filteredItem) {
      importContent(filteredItem.file);
      setArtigo(filteredItem);
    }
  }, [id, importContent, setArtigo]);


  // loading 
  if (loading) {
    return (
      <Layout id="pageArtigosDetalhes">
        <div className="container loading">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  // Detalhes
  if (artigo) {
    return (
      <Layout id="pageArtigosDetalhes">
        <section className="wrapperHeader">
          <div className="container">
            <h1>{artigo.title}</h1>
            <p>{artigo.date}</p>
          </div>
        </section>      

        <section className="wrapperArtigo">
          <div className="container">
            <div className="artigo">
              <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(htmlContent, { ALLOWED_TAGS: ['b', 'i', 'bold', 'strong', 'italic', 's'] })}}></div>
            </div>

            <LinkButton
              style="none"
              to="/producoes/artigos"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para lista de artigos
            </LinkButton>
          </div>
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout id="pageArtigosDetalhes">
          <div className="container">
            <h2>Ops... :(</h2>
            <p>O artigo solicitado não foi encontrada.</p>
            <br />

            <LinkButton
              style="none"
              to="/producoes/artigos"
              icon={<ArrowBackIosIcon/>}
            >
              Voltar para lista de artigos
            </LinkButton>
          </div>
      </Layout>
    );
  }

}

export default ArtigosDetalhes;
