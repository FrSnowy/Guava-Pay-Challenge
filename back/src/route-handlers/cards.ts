import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";
import CardStatus from "../constants/card-status";
import createCachedGenerator from "../utils/create-cached-generator";
import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";

type Card = {
  cardAccount: number,
  cardID: number,
  maskedCardNumber: string,
  expireDate: string,
  currency: Currency
  status: 'active' | 'blocked',
  balance: number,
}

type CardGeneratorData = {
  allowedAccounts: number[]
}

const generateCard = (_: number, i: number, data: CardGeneratorData): Card => ({
  cardAccount: randomFrom(data?.allowedAccounts as [number, ...number[]]),
  cardID: i,
  maskedCardNumber: `${randomIntFromInterval(1111, 9999)} **** **** **${randomIntFromInterval(11, 99)}`,
  expireDate: randomDateTime(),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  status: randomFrom([CardStatus.active, CardStatus.blocked]),
  balance: parseFloat(`${randomIntFromInterval(0, 100000)}.${randomIntFromInterval(0, 99)}`),
});

export const cardsGenerator = createCachedGenerator<Card, CardGeneratorData>(generateCard);

type CardsQuery = Partial<{
  institutionID: number,
  count: number,
}>;

const registerCardsRoute: GenerateRouteFn = s => s.get<{
  Querystring: CardsQuery
}>('/cards', (req, reply) => {
  if (!req.query.institutionID) {
    return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  }
  if (!cardsGenerator.cache[req.query.institutionID]) return DATA_OK(reply, []);
  return DATA_OK(reply, cardsGenerator.cache[req.query.institutionID]);
});

export default registerCardsRoute;
