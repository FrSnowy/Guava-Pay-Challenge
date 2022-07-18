import React from 'react';
import AuthModel, { AuthModelT } from '@/features/Auth/Auth.model';
import TransactionsModel, { TransactionsModelT } from '@/features/Transactions/Transactions.model';
import SingleTransactionModel, { SingleTransactionModelT } from './features/SingleTransaction/SingleTransaction.model';

type RootStore = {
  AuthModel: AuthModelT;
  TransactionsModel: TransactionsModelT,
  SingleTransactionModel: SingleTransactionModelT,
};

export const rootStore: RootStore = {
  AuthModel,
  TransactionsModel,
  SingleTransactionModel,
};

const useModel = <T extends typeof rootStore[keyof typeof rootStore]>(name: keyof typeof rootStore) => {
  const [store] = React.useState<T>(rootStore[name] as unknown as T);
  return store;
};

export type { AuthModelT } from '@/features/Auth/Auth.model';
export type { TransactionsModelT } from '@/features/Transactions/Transactions.model';
export type { SingleTransactionModelT } from '@/features/SingleTransaction/SingleTransaction.model';
export default useModel;