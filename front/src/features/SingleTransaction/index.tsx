import * as React from 'react';
import clsx from 'clsx';
import style from './style.module.pcss';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Grid, Header, Image, Loader } from 'semantic-ui-react'
import * as Headbar from '@/components/Headbar';
import useModel, { AuthModelT, SingleTransactionModelT } from '@/root-store';
import Currency from '@/components/Currency';
import { useParams } from 'react-router-dom';
import { Transaction } from '@/features/Transactions/Transactions.model';
import isoStringToLocalString from '@/utils/isostring-to-local-string';

const SingleTrasnactionContent: React.FC<Transaction> = transaction => (
  <React.Fragment>
    <Grid columns={2} className={style.container}>
      <Grid.Column>
        <Grid.Row className={style.transaction}>
          <Header as='h2'>
            Transaction for {transaction.amount}
            <Currency currency={transaction.currency} />
          </Header>
          <div>Provided to {transaction.merchantInfo}</div>
          <div>{isoStringToLocalString(transaction.transactionDate)}</div>
          <div>Transaction ID: {transaction.transactionID}</div>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column>
        <Header as = 'h2'>
          Provided by
        </Header>
        <div className={style.user}>
          <Image src={transaction.cardAccountMeta.avatar} className={style.avatar} />
          <span>{transaction.cardAccountMeta.firstName}&nbsp;{transaction.cardAccountMeta.lastName}</span>
        </div>
      </Grid.Column>
    </Grid>
    <div className={clsx(style.container, style.card)}>
      <Header as = 'h2'>Card number {transaction.cardMeta.maskedCardNumber}</Header>
      <Grid columns={2} className={style.cardContent}>
        <Grid.Column>
          <div className={clsx(style.status, {
            [style.blocked]: transaction.cardMeta.status === 'blocked',
            [style.active]: transaction.cardMeta.status === 'active',
          })}>
            Card is {transaction.cardMeta.status}
          </div>
        </Grid.Column>
        <Grid.Column>
          <div>Current balance: {transaction.cardMeta.balance}<Currency currency={transaction.cardMeta.currency}/></div>
          <div>Active due {isoStringToLocalString(transaction.cardMeta.expireDate)}</div>
        </Grid.Column>
      </Grid>
    </div>
  </React.Fragment>
);

const SingleTransactionPage = observer(() => {
  const { id: qsID } = useParams<{ id: string }>();
  const { institutionID } = useModel<AuthModelT>("AuthModel");
  const { loading, getTransaction, transaction } = useModel<SingleTransactionModelT>("SingleTransactionModel");

  const transactionID = React.useMemo(() => qsID ? parseInt(qsID, 10) : undefined, [qsID]);

  React.useEffect(() => {
    if (!institutionID || !transactionID) return;
    getTransaction(institutionID, transactionID);
  }, [institutionID, transactionID]);

  const transactionsView = React.useMemo(() => {
    if (loading) return (
      <Loader active inline />
    );

    if (!loading && !transaction) return <span>No data</span>

    return <SingleTrasnactionContent {...transaction!} />
  }, [loading, transaction]);

  return (
    <Page>
      <Headbar.Container>
        <Headbar.Title />
        <Headbar.Breadcrumbs transactionName={transaction ? `Transaction ID ${transaction.transactionID}` : undefined} />
      </Headbar.Container>
      <div>
        {transactionsView}
      </div>
    </Page>
  );
});

export default SingleTransactionPage;