import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";
import CardStatus from "../constants/card-status";
import createCachedGenerator from "../utils/create-cached-generator";
import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";

export type Card = {
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
  maskedCardNumber: `${randomIntFromInterval(1111, 9999)} **** **** ${randomIntFromInterval(1111, 9999)}`,
  expireDate: randomDateTime(),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  status: randomFrom([CardStatus.active, CardStatus.blocked]),
  balance: parseFloat(`${randomIntFromInterval(0, 100000)}.${randomIntFromInterval(0, 99)}`),
});

export const cardsGenerator = createCachedGenerator<Card, CardGeneratorData>(generateCard);
export const getCards = (
  institutionID: number,
  filters: {
    cardID?: number | string | undefined,
  },
) => {
  const cards: Card[] | undefined = cardsGenerator.cache[institutionID];
  if (!cards) return [];

  const { cardID } = filters;
  return cardID ? cards.filter(c => c.cardID === parseInt(`${cardID}`, 10)) : cards;
}

type CardsQuery = Partial<{
  institutionID: number,
  cardID: number,
}>;

const registerCardsRoute: GenerateRouteFn = s => s.get<{
  Querystring: CardsQuery
}>('/cards', (req, reply) => {
  const { institutionID, cardID } = req.query;
  if (!institutionID) {
    return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  }

  const cards = getCards(institutionID, { cardID });
  return DATA_OK(reply, cards);
});

export default registerCardsRoute;
