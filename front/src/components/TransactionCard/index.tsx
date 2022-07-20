import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { Transaction } from '@/features/Transactions/Transactions.model';
import Currency from '../Currency';
import isoStringToLocalString from '@/utils/isostring-to-local-string';
import AvatarCard from '../AvatarCard';

const TranscationCard: React.FC<Transaction> = ({
  transactionID,
  amount,
  currency,
  transactionDate,
  cardAccountMeta,
  cardMeta,
}) => {
  const parsedDate = React.useMemo(
    () => isoStringToLocalString(transactionDate),
    [transactionDate]
  );

  return (
    <AvatarCard account={cardAccountMeta}>
      <Card.Header as='h3'>
        <Link to={`/transactions/${transactionID}`}>
          {amount}
          <Currency currency={currency} /> transaction
        </Link>
      </Card.Header>
      <div>Transaction date: {parsedDate}</div>
      <div>Card number: {cardMeta.maskedCardNumber}</div>
    </AvatarCard>
  );
};

export default TranscationCard;
