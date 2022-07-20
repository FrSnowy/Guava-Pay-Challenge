import React from 'react';
import styles from './styles.module.pcss';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import isoStringToLocalString from '@/utils/isostring-to-local-string';
import AvatarCard from '../AvatarCard';
import { Card as CardT } from '@/features/Cards/Cards.model';
import Currency from '../Currency';

const CardCard: React.FC<CardT> = ({ cardID, maskedCardNumber, expireDate, currency, status, cardAccountMeta }) => {
  const activeDue = React.useMemo(() => isoStringToLocalString(expireDate), [expireDate]);
  const statusClassName = status === 'active' ? styles.active : styles.blocked;

  return (
    <AvatarCard account={cardAccountMeta} className={statusClassName}>
      <Card.Header as='h3'>
        <Link to = {`/cards/${cardID}`}>
          {maskedCardNumber}(<Currency currency={currency} />)
        </Link>
      </Card.Header>
      <div>Expire&nbsp;date:&nbsp;{activeDue}</div>
      <div className={statusClassName}>Status:&nbsp;{status === 'active' ? 'Active' : 'Blocked'}</div>
    </AvatarCard>
  );
};

export default CardCard;