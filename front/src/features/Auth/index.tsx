import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useModel, { AuthModelT } from '@/root-store';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Header, Input } from 'semantic-ui-react';
import styles from './style.module.pcss';

const AuthPage = observer(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useModel<AuthModelT>("AuthModel");
  const navigate = useNavigate();

  const formSubmitHandler: React.FormEventHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data: Record<string, string> = {};
    const inputs = [...(e.target as HTMLElement).getElementsByTagName('input')];
    inputs.forEach(inp => {
      const inputName = inp.getAttribute('name');
      if (!inputName) return;

      data[inputName] = inp.value;
    });

    const isAuthOK = await auth(data as { account: string });
    isAuthOK && navigate('/transactions');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <Container>
          <Header as='h5' textAlign='center'>
            <Header.Content>Authorization</Header.Content>
          </Header>
          <Input placeholder='Login' fluid name='account' required />
          <Button primary fluid role='submit' loading={loading} disabled={loading}>Submit</Button>
        </Container>
      </form>
      <span className={styles.notify}>
        It's the mock auth form used only to generate unique mock data for every different login. Feel free to pass any login you want.
      </span>
      <span className={styles.notify}>
        You can generate as many cards and transactions as you want by providing c= and t= params into the login field like this: <strong>test:c=10,t=10;</strong>
      </span>
      <span className={styles.notify}>
        If params are not provided, 5 cards and 25 transactions will be created
      </span>
    </div>
  )
});

export default AuthPage;