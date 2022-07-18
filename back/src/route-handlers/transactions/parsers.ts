import type Currency from "../../constants/currency";
import strToNumOrUndefined from "../../utils/str-to-num-or-undefined";
import type { TransactionsQuery, ParsedTransactionsQuery } from "./types";

export const transactionsQueryParser = (query: TransactionsQuery): ParsedTransactionsQuery => {
  const institutionID = strToNumOrUndefined(query.institutionID);
  const limit = strToNumOrUndefined(query.limit);
  const offset = strToNumOrUndefined(query.offset);
  const cardID = strToNumOrUndefined(query.cardID);
  const accountID = strToNumOrUndefined(query.accountID);
  const currency = query.currency ? query.currency as Currency : undefined;
  const dateRange = (() => {
    if (!query.dateRange) return undefined;
    const parsedDateRange = JSON.parse(query.dateRange);
    if (!Array.isArray(parsedDateRange) || parsedDateRange.length !== 2) return undefined;
    if (!parsedDateRange.every(d => typeof d === 'string')) return undefined;
    return parsedDateRange as [string, string];
  })();
  const minAmount = strToNumOrUndefined(query.minAmount);
  const maxAmount = strToNumOrUndefined(query.maxAmount);

  return {
    institutionID,
    filter: { limit, offset, cardID, accountID, currency, dateRange, minAmount, maxAmount },
  };
}