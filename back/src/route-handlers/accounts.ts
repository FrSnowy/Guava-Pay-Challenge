import { randomFrom } from "../utils/random";
import createCachedGenerator from "../utils/create-cached-generator";
import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";

type Account = {
  id: number,
  institutionID: number,
  firstName: string,
  lastName: string,
}

const generateCard = (forInstitution: number, i: number): Account => ({
  id: i,
  firstName: randomFrom(['Randy', 'Jim', 'Bob', 'David', 'Anna', 'Helen', 'Ivan', 'Olga']),
  lastName: randomFrom(['Any', 'Smiley', 'Random', 'Other', 'Another', 'Moreone']),
  institutionID: forInstitution,
});

export const accountGenerator = createCachedGenerator(generateCard);

export const getAccounts = (
  institutionID: number,
  filters: {
    accountID?: number | string | undefined,
  },
) => {
  const accounts: Account[] | undefined = accountGenerator.cache[institutionID];
  if (!accounts) return [];

  const { accountID } = filters;
  return accountID ? accounts.filter(acc => acc.id === parseInt(`${accountID}`, 10)) : accounts;
}

type AccountQuery = Partial<{
  institutionID: number,
  accountID: number,
}>;

const registerAccountsRoute: GenerateRouteFn = s => s.get<{
  Querystring: AccountQuery
}>('/accounts', (req, reply) => {
  const { institutionID, accountID } = req.query;

  if (!institutionID) {
    return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  }

  return DATA_OK(reply, getAccounts(institutionID, { accountID }));
});

export default registerAccountsRoute;
