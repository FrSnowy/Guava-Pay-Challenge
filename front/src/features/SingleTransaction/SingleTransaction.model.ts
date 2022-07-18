import fetch from '@/api';
import createQS from '@/utils/createQS';
import { observable, action, makeObservable } from 'mobx';
import { Transaction, TransactionsResponse } from '../Transactions/Transactions.model';

export type SingleTransactionModelT = {
  loading: boolean,
  transaction?: Transaction,
  getTransaction: (institutionID: number, transactionID: number) => Promise<Transaction | undefined>,
};

class SingleTransactionModel implements SingleTransactionModelT {
  @observable loading = true;
  @observable transaction?: Transaction;

  constructor() {
    makeObservable(this);
  }

  @action('Get transaction')
  getTransaction = async (institutionID: number, transactionID: number) => {
    if (this.transaction?.transactionID === transactionID) return this.transaction;

    this.transaction = undefined;
    this.loading = true;

    const qs = createQS('/transactions', { institutionID, transactionID });
    const resp = await fetch<TransactionsResponse>(qs);
    if (resp.statusCode !== 200) return undefined;
    this.transaction = resp.data.transactions[0];
    this.loading = false;
    return resp.data.transactions[0];
  }
}

const SingleTransactionModelInstance = new SingleTransactionModel();
export default SingleTransactionModelInstance;