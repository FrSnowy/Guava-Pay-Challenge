import fetch from '@/api';
import createQS from '@/utils/createQS';
import { observable, action, makeObservable } from 'mobx';
import { Card, CardsResponse } from '../Cards/Cards.model';

export type SingleCardModelT = {
  loading: boolean,
  card?: Card,
  getCard: (institutionID: number, cardID: number) => Promise<Card | undefined>,
};

class SingleCardModel implements SingleCardModelT {
  @observable loading = true;
  @observable card?: Card;

  constructor() {
    makeObservable(this);
  }

  @action('Get card')
  getCard = async (institutionID: number, cardID: number) => {
    if (this.card?.cardID === cardID) return this.card;

    this.card = undefined;
    this.loading = true;

    const qs = createQS('/cards', { institutionID, cardID });
    const resp = await fetch<CardsResponse>(qs);
    if (resp.statusCode !== 200) return undefined;
    this.card = resp.data.cards[0];
    this.loading = false;
    return resp.data.cards[0];
  }
}

const SingleCardModelInstance = new SingleCardModel();
export default SingleCardModelInstance;