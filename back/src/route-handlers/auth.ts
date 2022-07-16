import { NO_PARAMETER_RESPONSE } from "../constants/responses";
import type { GenerateRouteFn } from "types";

type AuthQuery = Partial<{
  account: string,
}>;

const accountsCache: string[] = [];

// This is the only mock query handler
// It will just return next not busy account id to the fe app for the every unique provided email
const registerAuthHandler: GenerateRouteFn = s => s.post<{
  Body: AuthQuery,
}>('/auth', (req, reply) => {
  console.log(req.body);
  const { account } = req.body;
  if (!account) return NO_PARAMETER_RESPONSE(reply, ['account']);

  const indexOfProvidedAccount = accountsCache.findIndex(acc => acc === account);
  if (indexOfProvidedAccount > -1) return { accountID: indexOfProvidedAccount };

  accountsCache.push(account);
  return { accountID: accountsCache.length - 1 };
});

export default registerAuthHandler;