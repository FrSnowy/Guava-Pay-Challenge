import fetch, { BaseResponseT } from '@/api';
import { CurrencyT } from '@/components/Currency';
import createQS from '@/utils/createQS';
import { observable, action, makeObservable } from 'mobx';
import { Account } from '../Account/Account.model';
import { Card } from '../Cards/Cards.model';

export type Transaction = {
  transactionID: number,
  cardAccount: number,
  cardID: number,
  amount: number,
  currency: CurrencyT,
  transactionDate: string,
  merchantInfo: string,
  cardAccountMeta: Account,
  cardMeta: Omit<Card, 'cardAccountMeta'>,
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
  getTransactions: (institutionID: number, p: TransactionFilters) => Promise<Transaction[]>,
};

export type TransactionsResponse = BaseResponseT & {
  data: {
    transactions: Transaction[],
    totalCount: number,
  }
}

class TransactionsModel implements TransactionsModelT {
  @observable loading = true;
  @observable transactions: Transaction[] = [];
  @observable totalCount: number = 0;

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
}

const TransactionsModelInstance = new TransactionsModel();
export default TransactionsModelInstance;