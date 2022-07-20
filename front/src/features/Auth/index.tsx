import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useModel, { AuthModelT } from '@/root-store';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Header, Input } from 'semantic-ui-react';
import styles from './style.module.pcss';

const AuthPage = observer(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useModel<AuthModelT>('AuthModel');
  const navigate = useNavigate();

  const formSubmitHandler: React.FormEventHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data: Record<string, string> = {};
    const inputs = [...(e.target as HTMLElement).getElementsByTagName('input')];
    inputs.forEach((inp) => {
      const inputName = inp.getAttribute('name');
      if (!inputName) return;

      data[inputName] = inp.value;
    });

    const isAuthOK = await auth(data as { account: string });
    isAuthOK && navigate('/transactions');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <Container>
          <Header as='h5' textAlign='center'>
            <Header.Content>Authorization</Header.Content>
          </Header>
          <Input
            placeholder='Institution login'
            fluid
            name='account'
            required
          />
          <Button
            primary
            fluid
            role='submit'
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Container>
      </form>
      <span className={styles.notify}>
        It&apos;s the mock auth form used only to generate unique mock data for every
        different login. Feel free to pass any institution login you want.
      </span>
    </div>
  );
});

export default AuthPage;
