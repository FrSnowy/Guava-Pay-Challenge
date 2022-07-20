import * as React from 'react';
import clsx from 'clsx';
import style from './style.module.pcss';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Button, Grid, Header } from 'semantic-ui-react'
import * as Headbar from '@/components/Headbar';
import useModel, { AuthModelT, SingleCardModelT } from '@/root-store';
import Currency from '@/components/Currency';
import { useNavigate, useParams } from 'react-router-dom';
import isoStringToLocalString from '@/utils/isostring-to-local-string';
import useSessionStoredState from '@/hooks/useSessionStoredState';
import { TRANSACTIONS_FILTER_BY_CARD_PARAM } from '@/features/Transactions';
import { Card } from '@/features/Cards/Cards.model';
import SingleContentWrapper from '@/components/SingleContentWrapper';

export const CardContent: React.FC<Card> = card => {
  const navigate = useNavigate();
  const [_, setTransactionsFilter] = useSessionStoredState<string | undefined>(undefined, TRANSACTIONS_FILTER_BY_CARD_PARAM);

  const onTransactionsClick = () => {
    setTransactionsFilter(`${card.cardID}`);
    navigate('/transactions');
  }

  return (
    <div className={style.card}>
      <Header as = 'h2'>Card number {card.maskedCardNumber}</Header>
      <Grid columns={3} className={style.cardContent}>
        <Grid.Column width={5}>
          <div className={clsx(style.status, {
            [style.blocked]: card.status === 'blocked',
            [style.active]: card.status === 'active',
          })}>
            Card is {card.status}
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <div>Current balance: {card.balance}<Currency currency={card.currency}/></div>
          <div>Active due {isoStringToLocalString(card.expireDate).split(' ')[0]}</div>
        </Grid.Column>
        <Grid.Column width={5} textAlign='right'>
          <Button secondary onClick={onTransactionsClick}>Transactions</Button>
        </Grid.Column>
      </Grid>
    </div>
  )
};

const SingleCardPage = observer(() => {
  const { id: qsID } = useParams<{ id: string }>();
  const { institutionID } = useModel<AuthModelT>("AuthModel");
  const { loading, getCard, card } = useModel<SingleCardModelT>("SingleCardModel");

  const cardID = React.useMemo(() => qsID ? parseInt(qsID, 10) : undefined, [qsID]);

  React.useEffect(() => {
    if (!institutionID || !cardID) return;
    getCard(institutionID, cardID);
  }, [institutionID, cardID]);

  return (
    <Page>
      <Headbar.Container>
        <Headbar.Title />
        <Headbar.Breadcrumbs cardName={card ? `Card ID ${card.cardID}` : undefined} />
      </Headbar.Container>
      <SingleContentWrapper loading={loading} noData={!loading && !card}>
        { card && <CardContent {...card} /> }
      </SingleContentWrapper>
    </Page>
  );
});

export default SingleCardPage;
