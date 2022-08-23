import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import {Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import configureStore from './store';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
