import React from 'react';
import ReactDOM from 'react-dom';

import Router from './core/Router';

import './styles/_global.scss';


ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
