import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";
import type { GenerateRouteFn } from "types";

type AuthBody = Partial<{
  account: string,
}>;

const accountsCache: string[] = [];

// This is the only mock query handler
// It will just return next not busy account id to the fe app for the every unique provided email
const registerAuthHandler: GenerateRouteFn = s => s.post<{
  Body: string,
}>('/auth', (req, reply) => {
  const { account } = JSON.parse(req.body) as AuthBody;
  if (!account) return NO_PARAMETER_RESPONSE(reply, ['account']);

  const indexOfProvidedAccount = accountsCache.findIndex(acc => acc === account);
  if (indexOfProvidedAccount > -1) return DATA_OK(reply, { accountID: indexOfProvidedAccount });

  accountsCache.push(account);
  return DATA_OK(reply, { accountID: accountsCache.length - 1 });
});

export default registerAuthHandler;