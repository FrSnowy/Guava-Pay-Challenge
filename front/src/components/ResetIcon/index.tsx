import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import style from './style.module.pcss';

type ResetIconT = {
  onClick: () => void;
};

const ResetIcon: React.FC<ResetIconT> = ({ onClick }) => (
  <Icon name='close' color='black' onClick={onClick} className={style.icon} />
);

export default ResetIcon;
