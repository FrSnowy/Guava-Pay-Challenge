import type Currency from "../../constants/currency";
import strToNumOrUndefined from "../../utils/str-to-num-or-undefined";
import type { CardsQuery, ParsedCardsQuery } from "./types";

export const cardsQueryParser = (query: CardsQuery): ParsedCardsQuery => {
  const institutionID = strToNumOrUndefined(query.institutionID);
  const offset = strToNumOrUndefined(query.offset);
  const limit = strToNumOrUndefined(query.limit);
  const cardID = strToNumOrUndefined(query.cardID);
  const accountID = strToNumOrUndefined(query.accountID);
  const currency = query.currency === undefined
    ? undefined
    : query.currency as Currency;
  const status = query.status === undefined
    ? undefined
    : query.status as 'active' | 'blocked';

  return {
    institutionID,
    filter: { cardID, accountID, currency, status, offset, limit }
  };
};
