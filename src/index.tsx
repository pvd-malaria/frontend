import React from 'react';
import { createRoot } from 'react-dom/client';


import Router from './core/Router';
import { AppContextProvider } from './contexts/AppContext';
import './styles/_global.scss';


const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </React.StrictMode>
);