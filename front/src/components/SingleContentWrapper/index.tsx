import * as React from 'react';
import { Loader } from 'semantic-ui-react';
import styles from './styles.module.pcss';

type SingleContentWrapperProps = {
  loading?: boolean;
  noData?: boolean;
  children: React.ReactNode;
};

const SingleContentWrapper: React.FC<SingleContentWrapperProps> = ({
  loading,
  noData,
  children,
}) => {
  return (
    <div className={styles.container}>
      {loading ? (
        <Loader active inline />
      ) : noData ? (
        <span>No data</span>
      ) : (
        children
      )}
    </div>
  );
};

export default SingleContentWrapper;
