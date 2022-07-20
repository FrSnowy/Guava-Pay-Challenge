import React from 'react';
import style from './style.module.pcss';
import { Button } from 'semantic-ui-react';
import useModel, { AuthModelT } from '@/root-store';
import { observer } from 'mobx-react';

const Logout = observer(() => {
  const { logout } = useModel<AuthModelT>('AuthModel');

  return (
    <div className={style.container}>
      <Button secondary onClick={logout}>
        Logout
      </Button>
    </div>
  );
});

export default Logout;
