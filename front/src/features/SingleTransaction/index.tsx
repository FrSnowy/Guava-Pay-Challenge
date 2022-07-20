import * as React from 'react';
import style from './style.module.pcss';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Grid, Header } from 'semantic-ui-react'
import * as Headbar from '@/components/Headbar';
import useModel, { AuthModelT, SingleTransactionModelT } from '@/root-store';
import Currency from '@/components/Currency';
import { useParams } from 'react-router-dom';
import { Transaction } from '@/features/Transactions/Transactions.model';
import isoStringToLocalString from '@/utils/isostring-to-local-string';
import SingleContentWrapper from '@/components/SingleContentWrapper';
import { CardInformation } from '../SingleCard';
import { AccountInfo } from '../Account';

const SingleTransactionContent: React.FC<Transaction> = transaction => {
  return (
    <React.Fragment>
      <div className={style.wrapper}>
        <Grid columns={2}>
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
            <AccountInfo title='Assigned to' {...transaction.cardAccountMeta} />
          </Grid.Column>
        </Grid>
      </div>
      <div className={style.card}>
        <CardInformation
          {...transaction.cardMeta}
          withLink={`${window.location.pathname}/${transaction.cardMeta.cardID}`}
        />
      </div>
    </React.Fragment>
  )
};

const SingleTransactionPage = observer(() => {
  const { transactionID: qsID } = useParams<{ transactionID: string }>();
  const { institutionID } = useModel<AuthModelT>("AuthModel");
  const { loading, getTransaction, transaction } = useModel<SingleTransactionModelT>("SingleTransactionModel");

  const transactionID = React.useMemo(() => qsID ? parseInt(qsID, 10) : undefined, [qsID]);

  React.useEffect(() => {
    if (!institutionID || !transactionID) return;
    getTransaction(institutionID, transactionID);
  }, [institutionID, transactionID]);

  return (
    <Page>
      <Headbar.Container>
        <Headbar.Title />
        <Headbar.Breadcrumbs transactionName={transaction ? `Transaction ID ${transaction.transactionID}` : undefined} />
      </Headbar.Container>
      <SingleContentWrapper loading={loading} noData={!loading && !transaction}>
        { transaction && <SingleTransactionContent {...transaction} />}
      </SingleContentWrapper>
    </Page>
  );
});

export default SingleTransactionPage;
