import * as React from 'react';
import Page from '@/components/Page';
import { Divider, Grid } from 'semantic-ui-react'
import Headbar from '@/components/Headbar';
import TranscationCard from '@/components/TransactionCard';

const TransactionsPage = () => (
  <Page>
    <TranscationCard />
  </Page>
);

export default TransactionsPage
