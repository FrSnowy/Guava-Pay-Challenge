import * as React from 'react';
import style from './style.module.pcss';
import { Header, Image } from 'semantic-ui-react';
import { Account } from './Account.model';

export const AccountInfo: React.FC<Account & { title?: string }> = ({
  title,
  ...account
}) => {
  return (
    <div className={style.user}>
      {title && <Header as='h2'>{title}</Header>}
      <div className={style.content}>
        <Image src={account.avatar} className={style.avatar} />
        <span>
          {account.firstName}&nbsp;{account.lastName}
        </span>
      </div>
    </div>
  );
};
