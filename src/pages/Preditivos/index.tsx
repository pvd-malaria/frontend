import { useCallback, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Button from '@mui/material/Button';

import Layout from '../../components/Layout';

import Fullscreen from '../../components/Fullscreen';

import './styles.css';


function Preditivos() {

  const fullscreenHandle = useCallback(() => {
    const elementToOpen = document.querySelector('#iframeDashboard');
    Fullscreen(elementToOpen)
  }, []);


  useEffect(() => {
    console.log('init -> Preditivos.useEffect');
    
  }, []);


  return (
    <Layout id="pagePreditivos">
      <section className="wrapperInfo">
        <div className="container">
          <h1>Modelos Preditivos</h1>
          <p>
            Utilizamos modelos autoregressão integrada a média móvel (ARIMA) e rede 
            neural com autoregressão (NNETAR) nos dados do SIVEP para estimar o número 
            de casos em um determinado horizonte futuro em uma Unidade da Federação (UF), 
            escolhidos pelo usuário. No teste ao lado, os modelos são treinados em anos 
            anteriores (-2018) e os modelos com a melhor performance são utilizados para 
            prever o número médio de casos e os intervalos de confiança de 95% para o 
            ano de 2019. A principal diferença entre os modelos neste caso, é que o modelo 
            ARIMA prediz melhor séries mais estáveis (menor variância), enquanto o NNETAR 
            se ajusta melhor as séries mais instáveis. Por outro lado, o NNETAR é mais 
            intensivo computacionalmente e produz intervalos de confiança menos plausíveis, 
            razão pelo qual ele é menos recomendado em séries com variância menor 
            (ex. Amapá). Ambos os modelos tem melhor performance preditiva nos horizontes 
            de 1 e 12 meses, nos quais eles conseguem captar regularidades. Nenhum modelo 
            é capaz de antecipar grandes variações ano-a-ano e as estimativas devem ser 
            utilizadas como medidas da tendência observada em anos anteriores.
          </p>
        </div>
      </section>      

      <section className="wrapperDashboard">
        <div className="container">
          <div className="dashboard">
            <CircularProgress />

            <iframe 
              id="iframeDashboard"
              title="Modelos Preditivos"
              src="https://vinicius-maia.shinyapps.io/forecasts/"
              width="100%"  
              height="900"
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
}

export default Preditivos;