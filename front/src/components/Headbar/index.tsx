import * as React from 'react';
import Page from '@/components/Page';
import clsx from 'clsx';
import styles from './style.module.pcss';
import { Button, Container, Divider, Grid, Header } from 'semantic-ui-react'

const Headbar = () => (
  <div>
    <div className={styles.header}>
      <Header as="h1" textAlign='center'>
        <Header.Content>GuavaPay Test Task</Header.Content>
      </Header>
    </div>
    <div className={styles['menu']}>
      <Container textAlign='center'>
        <Grid columns={2}>
          <Grid.Column>
            <a className={clsx(styles.link, styles.active)}>
              Institution transactions
            </a>
          </Grid.Column>
          <Grid.Column>
            <a className={styles.link}>
              Institution cards
            </a>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  </div>
);

export default Headbar
