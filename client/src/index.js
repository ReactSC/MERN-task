import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render( app, document.getElementById('root') );

serviceWorker.register();
