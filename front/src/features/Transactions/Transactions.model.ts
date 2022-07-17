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
}

export type TransactionsModelT = {
  totalCount: number,
  transactions: Transaction[],
  filters: TransactionsUniqueFilterValues,
  getTransactions: (p: { institutionID: number, limit?: number, offset?: number }) => Promise<Transaction[]>,
  getFilterUniqueValues: (p: { institutionID: number }) => Promise<TransactionsUniqueFilterValues>,
};

type TransactionsResponse = BaseResponseT & {
  data: {
    transactions: Transaction[],
    totalCount: number,
  }
}

export type TransactionsUniqueFilterValues = {
  cardIDs: number[],
  cardAccount: number[],
  currency: CurrencyT[],
}

type TransactionsUniqueFilterValuesResponse = BaseResponseT & {
  data: TransactionsUniqueFilterValues
}

class TransactionsModel implements TransactionsModelT {
  @observable transactions: Transaction[] = [];
  @observable totalCount: number = 0;
  @observable filters: TransactionsUniqueFilterValues = { cardIDs: [], cardAccount: [], currency: [] };

  constructor() {
    makeObservable(this);
  }

  @action('Get transactions')
  getTransactions = async ({ institutionID, limit, offset }: { institutionID: number, limit?: number, offset?: number }) => {
    const qs = createQS('/transactions', { limit, offset, institutionID });
    const resp = await fetch<TransactionsResponse>(qs);
    if (resp.statusCode !== 200) return [];
    this.transactions = resp.data.transactions;
    this.totalCount = resp.data.totalCount;
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