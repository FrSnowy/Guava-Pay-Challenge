import strToNumOrUndefined from "../../utils/str-to-num-or-undefined";
import type { AccountQuery, ParsedAccountQuery } from "./types";

export const accountQueryParser = (query: AccountQuery): ParsedAccountQuery => {
  const institutionID = strToNumOrUndefined(query.institutionID);
  const accountID = strToNumOrUndefined(query.accountID);

  return {
    institutionID,
    filter: { accountID }
  };
};
