import React from 'react';
import styles from './style.module.pcss';

export type PageT = {
  children: React.ReactNode;
};

const Page: React.FC<PageT> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.page}>
      { children }
    </div>
  </div>
);

export default Page;