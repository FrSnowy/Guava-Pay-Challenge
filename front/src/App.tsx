import * as React from 'react';
import useModel, { AuthModelT } from '@/root-store';
import AuthPage from '@/features/Auth';
import TransactionsPage from '@/features/Transactions';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SingleTransactionPage from './features/SingleTransaction';
import Logout from './components/Logout';
import { observer } from 'mobx-react';
import CardsPage from './features/Cards';
import SingleCardPage from './features/SingleCard';

export const AppRoutesConfig = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/transactions', element: <TransactionsPage /> },
  { path: '/transactions/:transactionID', element: <SingleTransactionPage /> },
  { path: '/transactions/:transactionID/:cardID', element: <SingleCardPage /> },
  { path: '/cards', element: <CardsPage /> },
  { path: '/cards/:cardID', element: <SingleCardPage />}
] as const;

const AppRoutes = AppRoutesConfig
  .map(r => <Route key={r.path} path={r.path} element={r.element} />)

const App = observer(() => {
  const navigate = useNavigate();
  const { authorized } = useModel<AuthModelT>("AuthModel");

  React.useEffect(() => {
    !authorized && navigate('/auth');
  }, [authorized]);

  return (
    <React.Fragment>
      <Routes>{AppRoutes}</Routes>
      { authorized && <Logout /> }
    </React.Fragment>
  );
});

export default App
