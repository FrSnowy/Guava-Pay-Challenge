import React from 'react';
import AuthModel, { AuthModelT } from '@/features/Auth/Auth.model';
import TransactionsModel, { TransactionsModelT } from '@/features/Transactions/Transactions.model';

type RootStore = {
  AuthModel: AuthModelT;
  TransactionsModel: TransactionsModelT,
};

export const rootStore: RootStore = {
  AuthModel,
  TransactionsModel,
};

const useModel = <T extends typeof rootStore[keyof typeof rootStore]>(name: keyof typeof rootStore) => {
  const [store] = React.useState<T>(rootStore[name] as unknown as T);
  return store;
};

export type { AuthModelT } from '@/features/Auth/Auth.model';
export type { TransactionsModelT } from '@/features/Transactions/Transactions.model';
export default useModel;