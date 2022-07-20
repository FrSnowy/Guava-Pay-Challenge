import * as React from 'react';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Header, Loader } from 'semantic-ui-react'
import * as Headbar from '@/components/Headbar';
import Sidebar from '@/components/Sidebar';
import TranscationCard from '@/components/TransactionCard';
import useModel, { AuthModelT, FiltersModelT, TransactionsModelT } from '@/root-store';
import style from './style.module.pcss';
import usePagination from '@/hooks/usePagination';
import { transformCurrency } from '@/components/Currency';
import useFilter from '@/hooks/useFilter';
import useDateRangeFilter from '@/hooks/useDateRangeFilter';
import useAmountFilter from '@/hooks/useAmountFilter';

const TRANSACTIONS_PER_PAGE = 10;

export const TRANSACTIONS_FILTER_BY_CARD_PARAM = 'transactions_filter_by_card';
export const TRANSACTIONS_FILTER_BY_ACCOUNT_PARAM = 'transactions_filter_by_account';
export const TRANSACTIONS_FILTER_BY_CURRENCY_PARAM = 'transactions_filter_by_currency';
export const TRANSACTIONS_FILTER_BY_DATE_PARAM = 'transactions_filter_by_date';
export const TRANSACTIONS_FILTER_BY_AMOUNT_PARAM = 'transactions_filter_by_amount';
export const TRANSACTIONS_PAGINATION_PARAM = 'transactions_pagination';

const TransactionsPage = observer(() => {
  const { institutionID } = useModel<AuthModelT>("AuthModel");
  const { transactionsFilters: filters, getTransactionsFilters } = useModel<FiltersModelT>("FiltersModel");
  const { loading, transactions, totalCount, getTransactions } = useModel<TransactionsModelT>('TransactionsModel');

  const { view: paginationView, currentPage, setCurrentPage } = usePagination({
    initialPage: 1,
    paramName: TRANSACTIONS_PAGINATION_PARAM,
    totalPages: Math.ceil(totalCount / TRANSACTIONS_PER_PAGE),
  });

  const { view: cardIDFilterView, value: cardID } = useFilter({
    name: 'By card',
    paramName: TRANSACTIONS_FILTER_BY_CARD_PARAM,
    values: filters.cardIDs.map(v => ({ value: `${v.cardID}`, label: `${v.maskedCardNumber} (ID: ${v.cardID})` })),
  });

  const { view: accountFilterView, value: accountID } = useFilter({
    name: 'By account',
    paramName: TRANSACTIONS_FILTER_BY_ACCOUNT_PARAM,
    values: filters.cardAccount.map(v => ({ value: `${v.id}`, label: `${v.firstName} ${v.lastName} (ID: ${v.id})` })),
  });

  const { view: currencyFilterView, value: currency } = useFilter({
    name: 'By currency',
    paramName: TRANSACTIONS_FILTER_BY_DATE_PARAM,
    values: filters.currency.map(c => ({ value: c, label: `${transformCurrency(c)} (${c})`})),
  });

  const { view: dateFilterView, value: dateRange } = useDateRangeFilter({
    paramName: TRANSACTIONS_FILTER_BY_AMOUNT_PARAM,
  });

  const { view: amountFilterView, min: minAmount, max: maxAmount } = useAmountFilter({
    paramName: 'transactions_filter_by_amount',
  });

  React.useEffect(() => {
    if (!institutionID) return;
    getTransactionsFilters(institutionID);
  }, [institutionID, getTransactionsFilters]);

  React.useEffect(() => {
    if (!institutionID) return;
    getTransactions(institutionID, {
      limit: TRANSACTIONS_PER_PAGE,
      offset: (currentPage - 1) * TRANSACTIONS_PER_PAGE,
      cardID,
      accountID,
      currency,
      dateRange,
      minAmount,
      maxAmount,
    });
  }, [getTransactions, currentPage, cardID, accountID, currency, dateRange, minAmount, maxAmount]);

  const transactionsView = React.useMemo(() => {
    if (loading) return (
      <Loader active inline />
    );

    if (!loading && totalCount === 0) return <span>No data</span>

    return transactions.map(t => <TranscationCard key={t.transactionID} {...t}/>)
  }, [transactions]);

  return (
    <Page>
      <Headbar.Container>
        <Headbar.Title />
        <Headbar.MainPageNavigation onPageChange={() => setCurrentPage(1)} />
      </Headbar.Container>
      <Sidebar>
        <Header as='h3' textAlign='center'>
          <Header.Content>Filter transactions</Header.Content>
        </Header>
        {
          cardIDFilterView || accountFilterView || currencyFilterView || dateFilterView || amountFilterView
            ? (
              <React.Fragment>
                {cardIDFilterView}
                {accountFilterView}
                {currencyFilterView}
                {dateFilterView}
                {amountFilterView}
              </React.Fragment>
            )
            : <span>No fields to filter</span>
        }
      </Sidebar>
      <div className={style.container}>
        {transactionsView}
        {paginationView}
      </div>
    </Page>
  );
});

export default TransactionsPage
