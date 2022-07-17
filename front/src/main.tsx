import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'css-reset-and-normalize';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'mobx-react';
import { rootStore } from '@/root-store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider {...rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
