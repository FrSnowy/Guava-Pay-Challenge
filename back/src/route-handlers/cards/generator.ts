import Currency from "../../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../../utils/random";
import CardStatus from "../../constants/card-status";
import createCachedGenerator from "../../utils/create-cached-generator";
import type * as T from './types';

const generateCard = (_: number, i: number, data: T.CardGeneratorData): T.Card => ({
  cardAccount: randomFrom(data?.allowedAccounts as [number, ...number[]]),
  cardID: i,
  maskedCardNumber: `${randomIntFromInterval(1111, 9999)} **** **** ${randomIntFromInterval(1111, 9999)}`,
  expireDate: randomDateTime(),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  status: randomFrom([CardStatus.active, CardStatus.blocked]),
  balance: parseFloat(`${randomIntFromInterval(0, 100000)}.${randomIntFromInterval(0, 99)}`),
});

const cardsGenerator = createCachedGenerator<T.Card, T.CardGeneratorData>(generateCard);
export default cardsGenerator;