import React from 'react';
import clsx from 'clsx';
import style from './styles.module.pcss';
import { Card, Grid, Image } from 'semantic-ui-react';
import { Account } from '@/features/Account/Account.model';

type AvatarCardT = {
  className?: string,
  account?: Account,
  children?: React.ReactNode
}

const AvatarCard: React.FC<AvatarCardT> = ({ account, className, children }) => {
  return (
    <Card className={clsx(style.card, className)}>
      <Card.Content>
        <Grid>
          <Grid.Column width={8}>
            {children}
            {
              account && (
                <div className={style.author}>
                  <strong>Assigned to:</strong>&nbsp;{account.firstName}&nbsp;{account.lastName}
                </div>
              )
            }
          </Grid.Column>
          {
            account && (
              <Grid.Column textAlign='right' width={8}>
                <Grid.Row>
                  <Image loading='lazy' src={account.avatar} className={style.avatar} />
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
              </Grid.Column>
            )
          }      
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default AvatarCard;