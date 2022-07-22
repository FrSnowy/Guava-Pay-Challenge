import React from 'react';
import clsx from 'clsx';
import styles from './style.module.pcss';

export type PageT = {
  withSidebar?: boolean;
  children: React.ReactNode;
};

const Page: React.FC<PageT> = ({ children, withSidebar }) => (
  <div className={clsx(styles.container, { [styles.withSidebar]: withSidebar }) }>
    <div className={styles.page}>{children}</div>
  </div>
);

export default Page;
