import React from 'react';
import ReactDOM from 'react-dom';

import Router from './core/Router';

import { AppContextProvider } from './contexts/AppContext';

import './styles/_global.scss';


ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
