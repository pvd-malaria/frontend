import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Classificacao from '../pages/Classificacao';
import Contato from '../pages/Contato';
import Dashboards from '../pages/Dashboards';
import Inicial from '../pages/Inicial';
import Preditivos from '../pages/Preditivos';
import ArtigosDetalhes from '../pages/Producoes/Artigos/Detalhes';
import ArtigosLista from '../pages/Producoes/Artigos/Lista';
import BoletinsDetalhes from '../pages/Producoes/Boletins/Detalhes';
import BoletinsLista from '../pages/Producoes/Boletins/Lista';
import CursosLista from '../pages/Producoes/Cursos/Lista';
import Referencias from '../pages/Producoes/Referencias';
import Sobre from '../pages/Sobre';
import UiGuide from '../pages/UiGuide';
import VisualizacoesDetalhes from '../pages/Visualizacoes/Detalhes';
import VisualizacoesLista from '../pages/Visualizacoes/Lista';

// import layout temporary
import Layout from '../components/Layout';
import ScrollToTop from '../components/ScrollToTop';
import CarregarDados from '../pages/CarregarDados/src';
import LoginGuard from '../pages/CarregarDados/src/loginPage/LoginGuard';
import Estatisticas from '../pages/Estatisticas';


function Router() {
  return (
    <BrowserRouter >
      <ScrollToTop/>
      <Routes >
        <Route path="/" element={<Inicial/>} />
        <Route path="/sobre" element={<Sobre/>} />
        <Route path="/contato" element={<Contato/>} />
        <Route path="/dashboards" element={<Layout><h1>Dashboard</h1></Layout>} />
        <Route path="/dashboards/:id" element={<Dashboards/>} />
        <Route path="/modelos" element={<Layout><h1>Modelos</h1></Layout>} />
        <Route path="/modelos/classificacao" element={<Classificacao/>} />
        <Route path="/modelos/preditivos" element={<Preditivos/>} />
        <Route path="/producoes" element={<Layout><h1>Producoes</h1></Layout>} />
        <Route path="/visualizacoes/:id" element={<VisualizacoesDetalhes/>} />
        <Route path="/visualizacoes" element={<VisualizacoesLista/>} />
        <Route path="/estatisticas" element={<Estatisticas/>} />
        <Route path="/carregar/dados" element={<LoginGuard/>} >
          <Route element={<CarregarDados />}>  </Route> 
        </Route>

        <Route path="/producoes/boletins/:id" element={<BoletinsDetalhes/>} />
        <Route path="/producoes/boletins" element={<BoletinsLista/>} />
        <Route path="/producoes/cursos" element={<CursosLista/>} />
        <Route path="/producoes/cientificas/:id" element={<ArtigosDetalhes/>} />
        <Route path="/producoes/cientificas" element={<ArtigosLista/>} />
        <Route path="/producoes/referencias" element={<Referencias/>} />
        <Route path="/ui-guide" element={<UiGuide/>} />
        <Route path="*" element={<Layout><h1>Page not found</h1></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
