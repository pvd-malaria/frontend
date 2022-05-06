import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Inicial from '../pages/Inicial';
import Sobre from '../pages/Sobre';
import UiGuide from '../pages/UiGuide';
import VisualizacoesLista from '../pages/Visualizacoes/Lista';

// import layout temporary
import Layout from '../components/Layout';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicial/>} />
        <Route path="/sobre" element={<Sobre/>} />
        <Route path="/dashboard" element={<Layout><h1>Dashboard</h1></Layout>} />
        <Route path="/modelos" element={<Layout><h1>Modelos</h1></Layout>} />
        <Route path="/producoes" element={<Layout><h1>Producoes</h1></Layout>} />
        <Route path="/visualizacoes" element={<VisualizacoesLista/>} />
        <Route path="/ui-guide" element={<UiGuide/>} />
        <Route path="*" element={<Layout><h1>Page not found</h1></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
