import * as React from 'react';
import Headbar from './components/Headbar';
import TransactionsPage from '@/features/Transactions';
import AuthPage from './features/Auth';

const App = () => (
  <React.Fragment>
    <Headbar />
    <AuthPage />
  </React.Fragment>
);

export default App
