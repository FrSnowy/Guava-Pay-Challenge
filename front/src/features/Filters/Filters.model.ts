import fetch, { BaseResponseT } from '@/api';
import { CurrencyT } from '@/components/Currency';
import createQS from '@/utils/createQS';
import { observable, action, makeObservable } from 'mobx';

type TransactionsUniqueFilterValues = {
  cardIDs: { cardID: number, maskedCardNumber: string }[],
  cardAccount: { id: number, firstName: string, lastName: string }[],
  currency: CurrencyT[],
}

type CardsUniqueFilterValues = TransactionsUniqueFilterValues & {
  status: ('active' | 'blocked')[],
};

type UniqueFilterResponse<T> = BaseResponseT & {
  data: T
}

export type FiltersModelT = {
  loading: boolean,
  transactionsFilters: TransactionsUniqueFilterValues,
  cardsFilters: CardsUniqueFilterValues,
  getTransactionsFilters: (institutionID: number) => Promise<TransactionsUniqueFilterValues>,
  getCardsFilters: (institutionID: number) => Promise<CardsUniqueFilterValues>,
};

const EMPTY_TRANSACTION_FILTERS: TransactionsUniqueFilterValues = { cardIDs: [], cardAccount: [], currency: [] };
const EMPTY_CARDS_FILTERS: CardsUniqueFilterValues = { cardIDs: [], cardAccount: [], currency: [], status: [] };

class FiltersModel implements FiltersModelT {
  @observable loading = true;
  @observable transactionsFilters: TransactionsUniqueFilterValues = EMPTY_TRANSACTION_FILTERS;
  @observable cardsFilters: CardsUniqueFilterValues = EMPTY_CARDS_FILTERS;

  constructor() {
    makeObservable(this);
  }

  private getFilters = async <T = TransactionsUniqueFilterValues | CardsUniqueFilterValues>(institutionID: number, filterFor: 'transactions' | 'cards'): Promise<UniqueFilterResponse<T> | undefined> => {
    const qs = createQS('/filters', { institutionID, filterFor });
    const resp = await fetch<UniqueFilterResponse<T>>(qs);
    if (resp.statusCode !== 200) return undefined;
    return resp;
  }

  @action('Get transactions filter values')
  getTransactionsFilters = async(institutionID: number): Promise<TransactionsUniqueFilterValues> => {
    this.transactionsFilters = EMPTY_TRANSACTION_FILTERS;
    const resp = await this.getFilters<TransactionsUniqueFilterValues>(institutionID, 'transactions');
    const data = resp?.data || { cardIDs: [], cardAccount: [], currency: [] };
    this.transactionsFilters = data;
    return data;
  }

  @action('Get cards filter values')
  getCardsFilters = async(institutionID: number): Promise<CardsUniqueFilterValues> => {
    this.cardsFilters = EMPTY_CARDS_FILTERS;
    const resp = await this.getFilters<CardsUniqueFilterValues>(institutionID, 'cards');
    const data = resp?.data || { cardIDs: [], cardAccount: [], currency: [], status: [] };
    this.cardsFilters = data;
    return data;
  }
}

const FiltersModelInstance = new FiltersModel();
export default FiltersModelInstance;