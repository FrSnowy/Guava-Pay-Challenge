import React from 'react';
import clsx from 'clsx';
import { Button, Icon } from 'semantic-ui-react';
import style from './style.module.pcss';

type SidebarT = {
  children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarT> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className={clsx(style.container, { [style.isOpen]: isOpen })}>
      {children}
      <Button icon className={style.button} secondary onClick={() => setIsOpen(v => !v)}>
        <Icon name={`arrow alternate circle ${isOpen ? 'left' : 'right'}`} />
      </Button>
    </div>
  )
};

export default Sidebar;
