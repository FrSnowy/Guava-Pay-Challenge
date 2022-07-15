import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";
import CardStatus from "../constants/card-status";
import type fastify from "fastify";
import createCachedGenerator from "../utils/create-cached-generator";

type Card = {
  cardAccount: number,
  cardID: number,
  maskedCardNumber: string,
  expireDate: string,
  currency: Currency
  status: 'active' | 'blocked',
  balance: number,
}

const generateCard = (forAccount: number, i: number): Card => ({
  cardAccount: forAccount,
  cardID: i,
  maskedCardNumber: `${randomIntFromInterval(1111, 9999)} **** **** **${randomIntFromInterval(11, 99)}`,
  expireDate: randomDateTime(),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  status: randomFrom([CardStatus.active, CardStatus.blocked]),
  balance: parseFloat(`${randomIntFromInterval(0, 100000)}.${randomIntFromInterval(0, 99)}`),
});

const generateCardWithCache = createCachedGenerator(generateCard);

type CardsQuery = Partial<{
  accountID: number,
  count: number,
}>;

const registerCardsRoute = (s: ReturnType<typeof fastify>) => s.get<{
  Querystring: CardsQuery
}>('/cards', (req) => {
  if (!req.query.accountID) return [];
  return generateCardWithCache(req.query.count || 20, req.query.accountID);
});

export default registerCardsRoute;
