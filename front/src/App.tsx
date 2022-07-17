import * as React from 'react';
import useModel, { AuthModelT } from '@/root-store';
import AuthPage from '@/features/Auth';
import TransactionsPage from '@/features/Transactions';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const { authorized } = useModel<AuthModelT>("AuthModel");

  React.useEffect(() => {
    !authorized && navigate('/auth');
  }, [authorized]);

  return (
    <Routes>
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/transactions' element={<TransactionsPage />} />
    </Routes>
  );
};

export default App
