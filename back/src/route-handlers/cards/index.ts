import type { GenerateRouteFn } from "../../types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import type * as T from './types';
import { cardsQueryParser } from "./parser";
import cardsGenerator from "./generator";

export const getCards = (institutionID: number, filters: T.CardsFilter) => {
  const cards: T.Card[] | undefined = cardsGenerator.cache[parseInt(`${institutionID}`, 10)];
  if (!cards) return [];

  const { cardID } = filters;
  const filteredCards = cards.filter(c => cardID ? c.cardID === cardID : true)

  return filteredCards
}

const registerCardsRoute: GenerateRouteFn = s => s.get<{ Querystring: T.CardsQuery }>('/cards', (req, reply) => {
  const { institutionID, filter } = cardsQueryParser(req.query);
  if (!institutionID) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);

  const cards = getCards(institutionID, filter);
  return DATA_OK(reply, cards);
});

export { default as cardsGenerator } from './generator';
export default registerCardsRoute;
