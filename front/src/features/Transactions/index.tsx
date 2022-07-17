import * as React from 'react';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Loader } from 'semantic-ui-react'
import Headbar from '@/components/Headbar';
import TranscationCard from '@/components/TransactionCard';
import useModel, { AuthModelT, TransactionsModelT } from '@/root-store';
import style from './style.module.pcss';
import usePagination from '@/hooks/usePagination';

const TRANSACTIONS_PER_PAGE = 10;

const TransactionsPage = observer(() => {
  const { accountID } = useModel<AuthModelT>("AuthModel");
  const { transactions, totalCount, getTransactions, getFilterUniqueValues } = useModel<TransactionsModelT>('TransactionsModel');

  const { view: paginationView, currentPage } = usePagination({
    initialPage: 1,
    totalPages: Math.ceil(totalCount / TRANSACTIONS_PER_PAGE),
  });

  React.useEffect(() => {
    if (accountID === undefined) return;
    getFilterUniqueValues({ accountID });
  }, [accountID, getFilterUniqueValues]);

  React.useEffect(() => {
    if (accountID === undefined) return;
    getTransactions({ accountID, limit: TRANSACTIONS_PER_PAGE, offset: (currentPage - 1) * TRANSACTIONS_PER_PAGE });
  }, [getTransactions, currentPage]);

  const transactionsView = React.useMemo(() => {
    if (transactions?.length === 0) return (
      <Loader active inline />
    );

    return transactions.map(t => <TranscationCard key={t.transactionID} {...t}/>)
  }, [transactions]);

  return (
    <Page>
      <Headbar />
      <div className={style.container}>
        {transactionsView}
        {paginationView}
      </div>
    </Page>
  );
});

export default TransactionsPage
