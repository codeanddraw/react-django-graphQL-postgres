import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './client'
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
