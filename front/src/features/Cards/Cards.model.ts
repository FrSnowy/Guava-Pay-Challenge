import fetch, { BaseResponseT } from '@/api';
import { CurrencyT } from '@/components/Currency';
import createQS from '@/utils/createQS';
import { observable, action, makeObservable } from 'mobx';
import { Account } from '../Account/Account.model';

export type Card = {
  cardAccount: number;
  cardID: number;
  maskedCardNumber: string;
  expireDate: string;
  currency: CurrencyT;
  status: 'active' | 'blocked';
  balance: number;
  cardAccountMeta: Account;
};

type CardFilters = {
  limit?: number;
  offset?: number;
  cardID?: string;
  accountID?: string;
  currency?: string;
  status?: string;
};

export type CardsModelT = {
  loading: boolean;
  totalCount: number;
  cards: Card[];
  getCards: (institutionID: number, p: CardFilters) => Promise<Card[]>;
};

export type CardsResponse = BaseResponseT & {
  data: {
    cards: Card[];
    totalCount: number;
  };
};

class CardsModel implements CardsModelT {
  @observable loading = true;
  @observable cards: Card[] = [];
  @observable totalCount = 0;

  constructor() {
    makeObservable(this);
  }

  @action('Get cards')
  getCards = async (institutionID: number, filters: CardFilters) => {
    this.loading = true;
    const qs = createQS('/cards', { institutionID, ...filters });
    const resp = await fetch<CardsResponse>(qs);
    if (resp.statusCode !== 200) return [];
    this.cards = resp.data.cards;
    this.totalCount = resp.data.totalCount;
    this.loading = false;
    return resp.data.cards;
  };
}

const CardsModelInstance = new CardsModel();
export default CardsModelInstance;
