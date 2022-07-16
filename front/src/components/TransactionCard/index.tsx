import React from 'react';
import style from './style.module.pcss';
import { Card } from 'semantic-ui-react';

const TranscationCard = () => (
  <Card className={style.card}>
    <Card.Content>
      <Card.Header>
        Transaction
      </Card.Header>
    </Card.Content>
  </Card>
);

export default TranscationCard;