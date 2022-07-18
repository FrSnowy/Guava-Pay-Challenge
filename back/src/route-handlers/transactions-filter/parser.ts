import strToNumOrUndefined from "../../utils/str-to-num-or-undefined";
import type { TransactionsFilterQuery, ParsedTransactionsFitlerQuery } from "./types";

export const transactionFilterQueryParser = (query: TransactionsFilterQuery): ParsedTransactionsFitlerQuery => {
  const institutionID = strToNumOrUndefined(query.institutionID);

  return {
    institutionID,
  };
};
