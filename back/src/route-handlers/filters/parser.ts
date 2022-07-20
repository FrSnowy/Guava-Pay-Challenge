import strToNumOrUndefined from "../../utils/str-to-num-or-undefined";
import type { FiltersQuery, ParsedFitlersQuery } from "./types";

export const transactionFilterQueryParser = (query: FiltersQuery): ParsedFitlersQuery => {
  const institutionID = strToNumOrUndefined(query.institutionID);
  const filterFor = ['transactions', 'cards'].includes(query.filterFor || '')
    ? query.filterFor
    : undefined;

  return {
    institutionID,
    filterFor: filterFor as 'transactions' | 'cards' | undefined,
  };
};
