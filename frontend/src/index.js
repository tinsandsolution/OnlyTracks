import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as songActions from "./store/songs"

import App from './App';
import { ModalProvider } from './context/Modal';
import MusicProvider from './context/MusicContext'
import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.songActions = songActions;
}


// automatically directes to https
if (window.location.protocol !== "https" && window.location.hostname !== "localhost") {
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

function Root() {
  return (
    <Provider store={store}>
      <MusicProvider>
      <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ModalProvider>
      </MusicProvider>
    </Provider>

  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
