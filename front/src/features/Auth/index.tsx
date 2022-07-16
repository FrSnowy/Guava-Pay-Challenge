import React from 'react';
import { Button, Container, Header, Input } from 'semantic-ui-react';
import styles from './style.module.pcss';

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Container>
          <Header as='h5' textAlign='center'>
            <Header.Content>Authorization</Header.Content>
          </Header>
          <Input placeholder='Login' fluid name='login' required />
          <Button primary fluid>Submit</Button>
        </Container>
      </form>
      <span className={styles.notify}>
        It's only mock auth form used only to generate unique mock data for every different login. Feel free to pass any login you want.
      </span>
    </div>
  )
};

export default AuthPage;