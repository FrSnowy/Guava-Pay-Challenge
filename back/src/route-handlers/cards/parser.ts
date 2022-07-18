import strToNumOrUndefined from "../../utils/str-to-num-or-undefined";
import type { CardsQuery, ParsedCardsQuery } from "./types";

export const cardsQueryParser = (query: CardsQuery): ParsedCardsQuery => {
  const institutionID = strToNumOrUndefined(query.institutionID);
  const cardID = strToNumOrUndefined(query.cardID);

  return {
    institutionID,
    filter: { cardID }
  };
};
