import * as React from 'react';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Header, Loader } from 'semantic-ui-react'
import Headbar from '@/components/Headbar';
import Sidebar from '@/components/Sidebar';
import TranscationCard from '@/components/TransactionCard';
import useModel, { AuthModelT, TransactionsModelT } from '@/root-store';
import style from './style.module.pcss';
import usePagination from '@/hooks/usePagination';
import { transformCurrency } from '@/components/Currency';
import useFilter from '@/hooks/useFilter';
import useDateRangeFilter from '@/hooks/useDateRangeFilter';

const TRANSACTIONS_PER_PAGE = 10;

const TransactionsPage = observer(() => {
  const { institutionID } = useModel<AuthModelT>("AuthModel");
  const { loading, transactions, filters, totalCount, getTransactions, getFilterUniqueValues } = useModel<TransactionsModelT>('TransactionsModel');

  const { view: paginationView, currentPage } = usePagination({
    initialPage: 1,
    totalPages: Math.ceil(totalCount / TRANSACTIONS_PER_PAGE),
  });

  const { view: cardIDFilterView, value: cardID } = useFilter({
    name: 'By card',
    paramName: 'transactions_filter_by_card',
    values: filters.cardIDs.map(v => ({ value: `${v.cardID}`, label: `${v.maskedCardNumber} (ID: ${v.cardID})` })),
  });

  const { view: accountFilterView, value: accountID } = useFilter({
    name: 'By account',
    paramName: 'transactions_filter_by_account',
    values: filters.cardAccount.map(v => ({ value: `${v.id}`, label: `${v.firstName} ${v.lastName} (ID: ${v.id})` })),
  });

  const { view: currencyFilterView, value: currency } = useFilter({
    name: 'By currency',
    paramName: 'transactions_filter_by_currency',
    values: filters.currency.map(c => ({ value: c, label: `${transformCurrency(c)} (${c})`})),
  });

  const { view: dateFilterView, value: dateRange } = useDateRangeFilter({
    paramName: 'transactions_filter_by_date',
  });

  React.useEffect(() => {
    if (institutionID === undefined) return;
    getFilterUniqueValues({ institutionID });
  }, [institutionID, getFilterUniqueValues]);

  React.useEffect(() => {
    if (institutionID === undefined) return;
    getTransactions(institutionID, {
      limit: TRANSACTIONS_PER_PAGE,
      offset: (currentPage - 1) * TRANSACTIONS_PER_PAGE,
      cardID,
      accountID,
      currency,
      dateRange,
    });
  }, [getTransactions, currentPage, cardID, accountID, currency, dateRange]);

  const transactionsView = React.useMemo(() => {
    if (loading) return (
      <Loader active inline />
    );

    if (!loading && totalCount === 0) return <span>No data</span>

    return transactions.map(t => <TranscationCard key={t.transactionID} {...t}/>)
  }, [transactions]);

  return (
    <Page withSidebar>
      <Headbar />
      <Sidebar>
        <Header as='h3' textAlign='center'>
          <Header.Content>Filters</Header.Content>
        </Header>
        {cardIDFilterView}
        {accountFilterView}
        {currencyFilterView}
        {dateFilterView}
      </Sidebar>
      <div className={style.container}>
        {transactionsView}
        {paginationView}
      </div>
    </Page>
  );
});

export default TransactionsPage
