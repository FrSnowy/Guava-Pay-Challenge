import fetch, { BaseResponseT } from '@/api';
import { CurrencyT } from '@/components/Currency';
import createQS from '@/utils/createQS';
import { observable, action, makeObservable } from 'mobx';

export type Transaction = {
  transactionID: number,
  cardAccount: number,
  cardID: number,
  amount: number,
  currency: CurrencyT,
  transactionDate: string,
  merchantInfo: string,
  cardAccountMeta: {
    id: number,
    firstName: string,
    lastName: string,
    avatar?: string,
  },
  //! Move to card type
  cardMeta: {
    cardAccount: number,
    cardID: number,
    maskedCardNumber: string,
    expireDate: string,
    currency: CurrencyT,
    status: 'active' | 'blocked',
    balance: number,
  }
}

type TransactionFilters = {
  limit?: number,
  offset?: number,
  cardID?: string,
  accountID?: string,
  currency?: string,
  dateRange?: [string, string],
  minAmount?: string,
  maxAmount?: string,
};

export type TransactionsModelT = {
  loading: boolean,
  totalCount: number,
  transactions: Transaction[],
  filters: TransactionsUniqueFilterValues,
  getTransactions: (institutionID: number, p: TransactionFilters) => Promise<Transaction[]>,
  getFilterUniqueValues: (p: { institutionID: number }) => Promise<TransactionsUniqueFilterValues>,
};

export type TransactionsResponse = BaseResponseT & {
  data: {
    transactions: Transaction[],
    totalCount: number,
  }
}

export type TransactionsUniqueFilterValues = {
  cardIDs: { cardID: number, maskedCardNumber: string }[],
  cardAccount: { id: number, firstName: string, lastName: string }[],
  currency: CurrencyT[],
}

type TransactionsUniqueFilterValuesResponse = BaseResponseT & {
  data: TransactionsUniqueFilterValues
}

class TransactionsModel implements TransactionsModelT {
  @observable loading = true;
  @observable transactions: Transaction[] = [];
  @observable totalCount: number = 0;
  @observable filters: TransactionsUniqueFilterValues = { cardIDs: [], cardAccount: [], currency: [] };

  constructor() {
    makeObservable(this);
  }

  @action('Get transactions')
  getTransactions = async (institutionID: number, filters: TransactionFilters) => {
    this.loading = true;
    const qs = createQS('/transactions', { institutionID, ...filters });
    const resp = await fetch<TransactionsResponse>(qs);
    if (resp.statusCode !== 200) return [];
    this.transactions = resp.data.transactions;
    this.totalCount = resp.data.totalCount;
    this.loading = false;
    return resp.data.transactions;
  }

  @action('Get transactions unique filter values')
  getFilterUniqueValues = async({ institutionID }: { institutionID: number }): Promise<TransactionsUniqueFilterValues> => {  
    const qs = createQS('/transactions/filters', { institutionID });
    const resp = await fetch<TransactionsUniqueFilterValuesResponse>(qs);
    if (resp.statusCode !== 200) return { cardIDs: [], cardAccount: [], currency: [] };
    this.filters = resp.data;
    return resp.data;

  }
}

const TransactionsModelInstance = new TransactionsModel();
export default TransactionsModelInstance;