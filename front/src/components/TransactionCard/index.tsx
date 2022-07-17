import React from 'react';
import style from './style.module.pcss';
import { Card } from 'semantic-ui-react';
import { Transaction } from '@/features/Transactions/Transactions.model';
import Currency from '../Currency';

const TranscationCard = ({ amount, currency, transactionDate }: Transaction) => {
  const parsedDate = React.useMemo(() => {
    const parsed = Date.parse(transactionDate);
    const date = new Date(parsed).toLocaleDateString();
    const time = new Date(parsed).toLocaleTimeString();

    return `${date} ${time}`;
  }, [transactionDate]);

  return (
    <Card className={style.card}>
      <Card.Content>
        <Card.Header>
          <a href = "/">
            {amount}<Currency currency={currency} /> transaction 
          </a>
        </Card.Header>
        <Card.Description>
          Dated {parsedDate}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default TranscationCard;