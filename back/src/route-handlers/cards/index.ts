import type { GenerateRouteFn } from "../../types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import type * as T from './types';
import { cardsQueryParser } from "./parser";
import cardsGenerator from "./generator";
import supportOffsetLimit from "../../utils/support-offset-limit";
import { getAccounts } from "../account";

export const getCards = (institutionID: number, filters: T.CardsFilters) => {
  const cardsCache: T.Card[] | undefined = cardsGenerator.cache[parseInt(`${institutionID}`, 10)];
  if (!cardsCache) return { totalCount: 0, cards: [] };

  const { offset, limit, cardID, accountID, currency, status } = filters;

  const cardIDFilter: T.CardsFilter = (c => cardID ? c.cardID === cardID : true);
  const cardAccountFilter: T.CardsFilter = (c => accountID ? c.cardAccount === accountID : true);
  const currencyFilter: T.CardsFilter = (c => currency ? c.currency === currency : true);
  const statusFilter: T.CardsFilter = (c => status ? c.status === status : true);

  const filteredCards = cardsCache
    .filter(cardIDFilter)
    .filter(cardAccountFilter)
    .filter(currencyFilter)
    .filter(statusFilter);

  const cards: T.CardResponse[] = supportOffsetLimit(filteredCards, offset, limit)
    .sort((a, b) => a.cardID - b.cardID)
    .map(card => ({
      ...card,
      cardAccountMeta: getAccounts(institutionID, { accountID: card.cardAccount })[0],
    }));

  return { totalCount: filteredCards.length, cards }
}

const registerCardsRoute: GenerateRouteFn = s => s.get<{ Querystring: T.CardsQuery }>('/cards', (req, reply) => {
  const { institutionID, filter } = cardsQueryParser(req.query);
  if (!institutionID) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);

  const cards = getCards(institutionID, filter);
  return DATA_OK(reply, cards);
});

export { default as cardsGenerator } from './generator';
export default registerCardsRoute;
