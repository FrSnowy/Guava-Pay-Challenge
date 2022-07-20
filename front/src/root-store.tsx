import React from 'react';
import AuthModel, { AuthModelT } from '@/features/Auth/Auth.model';
import FiltersModel, { FiltersModelT } from './features/Filters/Filters.model';
import CardsModel, { CardsModelT } from './features/Cards/Cards.model';
import TransactionsModel, {
  TransactionsModelT,
} from '@/features/Transactions/Transactions.model';
import SingleTransactionModel, {
  SingleTransactionModelT,
} from './features/SingleTransaction/SingleTransaction.model';
import SingleCardModel, {
  SingleCardModelT,
} from './features/SingleCard/SingleCard.model';

type RootStore = {
  AuthModel: AuthModelT;
  FiltersModel: FiltersModelT;
  CardsModel: CardsModelT;
  TransactionsModel: TransactionsModelT;
  SingleTransactionModel: SingleTransactionModelT;
  SingleCardModel: SingleCardModelT;
};

export const rootStore: RootStore = {
  AuthModel,
  FiltersModel,
  CardsModel,
  TransactionsModel,
  SingleCardModel,
  SingleTransactionModel,
};

const useModel = <T extends typeof rootStore[keyof typeof rootStore]>(
  name: keyof typeof rootStore
) => {
  const [store] = React.useState<T>(rootStore[name] as unknown as T);
  return store;
};

export type { AuthModelT } from '@/features/Auth/Auth.model';
export type { FiltersModelT } from '@/features/Filters/Filters.model';
export type { CardsModelT } from '@/features/Cards/Cards.model';
export type { TransactionsModelT } from '@/features/Transactions/Transactions.model';
export type { SingleCardModelT } from '@/features/SingleCard/SingleCard.model';
export type { SingleTransactionModelT } from '@/features/SingleTransaction/SingleTransaction.model';

export default useModel;
