import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.pcss';
import { Card, Image } from 'semantic-ui-react';
import { Transaction } from '@/features/Transactions/Transactions.model';
import Currency from '../Currency';
import isoStringToLocalString from '@/utils/isostring-to-local-string';

const TranscationCard = ({ transactionID, amount, currency, transactionDate, cardAccountMeta }: Transaction) => {
  const parsedDate = React.useMemo(() => isoStringToLocalString(transactionDate), [transactionDate]);

  return (
    <Card className={style.card}>
      <Card.Content>
        <Card.Content>
          <Image floated='right' src={cardAccountMeta.avatar} className={style.avatar} />
          <Card.Header as='h3'>
            <Link to = {`/transactions/${transactionID}`}>
              {amount}<Currency currency={currency} /> transaction 
            </Link>
          </Card.Header>
          <div>Transaction&nbsp;date:&nbsp;{parsedDate}</div>
          <div className={style.author}>
            <strong>Author:</strong>&nbsp;{cardAccountMeta.firstName}&nbsp;{cardAccountMeta.lastName}
          </div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default TranscationCard;