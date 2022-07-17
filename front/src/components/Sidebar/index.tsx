import React from 'react';
import style from './style.module.pcss';

type SidebarT = {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarT> = ({ children }) => {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}

export default Sidebar;