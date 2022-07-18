import type { GenerateRouteFn } from "../../types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import type * as T from "./types";
import { accountQueryParser } from "./parsers";
import accountGenerator from "./generator";

export const getAccounts = (institutionID: number, filters: T.AccountFilter) => {
  const { accountID } = filters;

  const accounts: T.Account[] | undefined = accountGenerator.cache[institutionID];
  if (!accounts) return [];

  const accountIDFilter = (a: T.Account) => accountID === undefined ? true : a.id === accountID;

  const filteredAccounts = accounts.filter(accountIDFilter);
  return filteredAccounts;
}

const registerAccountsRoute: GenerateRouteFn = s => s.get<{
  Querystring: T.AccountQuery
}>('/accounts', (req, reply) => {
  const { institutionID, filter } = accountQueryParser(req.query);
  if (!institutionID) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);

  return DATA_OK(reply, getAccounts(institutionID, filter));
});

export { default as accountGenerator } from './generator';
export default registerAccountsRoute;
