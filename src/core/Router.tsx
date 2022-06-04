import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import BoletinsLista from '../pages/Producoes/Boletins/Lista';
import Inicial from '../pages/Inicial';
import Sobre from '../pages/Sobre';
import UiGuide from '../pages/UiGuide';
import VisualizacoesDetalhes from '../pages/Visualizacoes/Detalhes';
import VisualizacoesLista from '../pages/Visualizacoes/Lista';

// import layout temporary
import Layout from '../components/Layout';
import ScrollToTop from '../components/ScrollToTop';


function Router() {
  return (
    <BrowserRouter >
      <ScrollToTop/>
      <Routes >
        <Route path="/" element={<Inicial/>} />
        <Route path="/sobre" element={<Sobre/>} />
        <Route path="/dashboard" element={<Layout><h1>Dashboard</h1></Layout>} />
        <Route path="/modelos" element={<Layout><h1>Modelos</h1></Layout>} />
        <Route path="/producoes" element={<Layout><h1>Producoes</h1></Layout>} />
        <Route path="/visualizacoes/:id" element={<VisualizacoesDetalhes/>} />
        <Route path="/visualizacoes" element={<VisualizacoesLista/>} />
        <Route path="/producoes/boletins" element={<BoletinsLista/>} />
        <Route path="/ui-guide" element={<UiGuide/>} />
        <Route path="*" element={<Layout><h1>Page not found</h1></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
