import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import { Provider } from 'mobx-react';
import { rootStore } from '@/root-store';
import { BrowserRouter } from 'react-router-dom';
import './main.pcss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider {...rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
