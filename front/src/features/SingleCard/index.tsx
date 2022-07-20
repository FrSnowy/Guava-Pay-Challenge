import * as React from 'react';
import clsx from 'clsx';
import style from './style.module.pcss';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Button, Grid, Header } from 'semantic-ui-react';
import * as Headbar from '@/components/Headbar';
import useModel, { AuthModelT, SingleCardModelT } from '@/root-store';
import Currency from '@/components/Currency';
import { Link, useNavigate, useParams } from 'react-router-dom';
import isoStringToLocalString from '@/utils/isostring-to-local-string';
import useSessionStoredState from '@/hooks/useSessionStoredState';
import { TRANSACTIONS_FILTER_BY_CARD_PARAM } from '@/features/Transactions';
import { Card } from '@/features/Cards/Cards.model';
import SingleContentWrapper from '@/components/SingleContentWrapper';
import { AccountInfo } from '../Account';

export const CardInformation: React.FC<
  Omit<Card, 'cardAccountMeta'> & { withLink?: string }
> = ({ withLink, ...card }) => {
  const navigate = useNavigate();
  const [_, setTransactionsFilter] = useSessionStoredState<string | undefined>(
    undefined,
    TRANSACTIONS_FILTER_BY_CARD_PARAM
  );

  const onTransactionsClick = () => {
    setTransactionsFilter(`${card.cardID}`);
    navigate('/transactions');
  };

  const header = React.useMemo(() => {
    const text = `Card number ${card.maskedCardNumber}`;
    return (
      <Header as='h2'>
        {withLink ? <Link to={withLink}>{text}</Link> : text}
      </Header>
    );
  }, [card.maskedCardNumber, withLink]);

  return (
    <div className={style.card}>
      {header}
      <Grid columns={3} className={style.cardContent}>
        <Grid.Column width={5}>
          <div
            className={clsx(style.status, {
              [style.blocked]: card.status === 'blocked',
              [style.active]: card.status === 'active',
            })}
          >
            Card is {card.status}
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <div>
            Current balance: {card.balance}
            <Currency currency={card.currency} />
          </div>
          <div>
            Active due {isoStringToLocalString(card.expireDate).split(' ')[0]}
          </div>
        </Grid.Column>
        <Grid.Column width={5} textAlign='right'>
          <Button secondary onClick={onTransactionsClick}>
            Transactions
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export const CardContent: React.FC<Card> = (card) => {
  return (
    <div className={style.container}>
      <CardInformation {...card} />
      <div className={style.meta}>
        <Grid columns={2}>
          <Grid.Column width={7}>
            <AccountInfo {...card.cardAccountMeta} title='Owner:' />
          </Grid.Column>
          <Grid.Column width={9}>
            <div>
              Sorry, but I really don&apos;t know what else we can show for the card.
            </div>
            <div>
              Lets just imagine that some important information located here too
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

const SingleCardPage = observer(() => {
  const { institutionID } = useModel<AuthModelT>('AuthModel');
  const { loading, getCard, card } =
    useModel<SingleCardModelT>('SingleCardModel');
  const { cardID: qsCardID, transactionID: qsTransactionID } = useParams<{
    cardID: string;
    transactionID?: string;
  }>();

  const cardID = React.useMemo(
    () => (qsCardID ? parseInt(qsCardID, 10) : undefined),
    [qsCardID]
  );

  React.useEffect(() => {
    if (!institutionID || !cardID) return;
    getCard(institutionID, cardID);
  }, [institutionID, cardID]);

  return (
    <Page>
      <Headbar.Container>
        <Headbar.Title />
        <Headbar.Breadcrumbs
          cardName={card ? `Card ID ${card.cardID}` : undefined}
          transactionName={
            qsTransactionID ? `Transaction ID ${qsTransactionID}` : undefined
          }
        />
      </Headbar.Container>
      <SingleContentWrapper loading={loading} noData={!loading && !card}>
        {card && <CardContent {...card} />}
      </SingleContentWrapper>
    </Page>
  );
});

export default SingleCardPage;
