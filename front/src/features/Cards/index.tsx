import * as React from 'react';
import { observer } from 'mobx-react';
import Page from '@/components/Page';
import { Header, Loader } from 'semantic-ui-react';
import * as Headbar from '@/components/Headbar';
import Sidebar from '@/components/Sidebar';
import useModel, { AuthModelT, FiltersModelT, CardsModelT } from '@/root-store';
import style from './style.module.pcss';
import usePagination from '@/hooks/usePagination';
import { transformCurrency } from '@/components/Currency';
import useFilter from '@/hooks/useFilter';
import CardCard from '@/components/CardCard';

const CARSD_PER_PAGE = 10;

export const CARDS_FILTER_BY_CARD_PARAM = 'cards_filter_by_card';
export const CARDS_FILTER_BY_ACCOUNT_PARAM = 'cards_filter_by_account';
export const CARDS_FILTER_BY_CURRENCY_PARAM = 'cards_filter_by_currency';
export const CARDS_FILTER_BY_STATUS_PARAM = 'cards_filter_by_status';
export const CARDS_PAGINATION_PARAM = 'cards_pagination';

const CardsPage = observer(() => {
  const { institutionID } = useModel<AuthModelT>('AuthModel');
  const { cardsFilters: filters, getCardsFilters } =
    useModel<FiltersModelT>('FiltersModel');
  const { loading, cards, totalCount, getCards } =
    useModel<CardsModelT>('CardsModel');

  const {
    view: paginationView,
    currentPage,
    setCurrentPage,
  } = usePagination({
    initialPage: 1,
    paramName: CARDS_PAGINATION_PARAM,
    totalPages: Math.ceil(totalCount / CARSD_PER_PAGE),
  });

  const { view: cardIDFilterView, value: cardID } = useFilter({
    name: 'By number',
    paramName: CARDS_FILTER_BY_CARD_PARAM,
    values: filters.cardIDs.map((v) => ({
      value: `${v.cardID}`,
      label: `${v.maskedCardNumber} (ID: ${v.cardID})`,
    })),
  });

  const { view: accountFilterView, value: accountID } = useFilter({
    name: 'By account',
    paramName: CARDS_FILTER_BY_ACCOUNT_PARAM,
    values: filters.cardAccount.map((v) => ({
      value: `${v.id}`,
      label: `${v.firstName} ${v.lastName} (ID: ${v.id})`,
    })),
  });

  const { view: currencyFilterView, value: currency } = useFilter({
    name: 'By currency',
    paramName: CARDS_FILTER_BY_CURRENCY_PARAM,
    values: filters.currency.map((c) => ({
      value: c,
      label: `${transformCurrency(c)} (${c})`,
    })),
  });

  const { view: statusFilterView, value: status } = useFilter({
    name: 'By status',
    paramName: CARDS_FILTER_BY_STATUS_PARAM,
    values: filters.status.map((s) => ({
      value: s,
      label: `${s[0].toUpperCase()}${s.slice(1, s.length)}`,
    })),
  });

  React.useEffect(() => {
    if (!institutionID) return;
    getCardsFilters(institutionID);
  }, [institutionID, getCardsFilters]);

  React.useEffect(() => {
    if (!institutionID) return;
    getCards(institutionID, {
      limit: CARSD_PER_PAGE,
      offset: (currentPage - 1) * CARSD_PER_PAGE,
      cardID,
      accountID,
      currency,
      status,
    });
  }, [getCards, currentPage, cardID, accountID, currency, status]);

  const transactionsView = React.useMemo(() => {
    if (loading) return <Loader active inline />;

    if (!loading && totalCount === 0) return <span>No data</span>;
    return cards.map((c) => <CardCard key={c.cardID} {...c} />);
  }, [cards]);

  return (
    <Page>
      <Headbar.Container>
        <Headbar.Title />
        <Headbar.MainPageNavigation onPageChange={() => setCurrentPage(1)} />
      </Headbar.Container>
      <Sidebar>
        <Header as='h3' textAlign='center'>
          <Header.Content>Filter cards</Header.Content>
        </Header>
        {cardIDFilterView ||
        accountFilterView ||
        currencyFilterView ||
        statusFilterView ? (
          <React.Fragment>
            {cardIDFilterView}
            {accountFilterView}
            {currencyFilterView}
            {statusFilterView}
          </React.Fragment>
        ) : (
          <span>No fields to filter</span>
        )}
      </Sidebar>
      <div className={style.container}>
        {transactionsView}
        {paginationView}
      </div>
    </Page>
  );
});

export default CardsPage;
