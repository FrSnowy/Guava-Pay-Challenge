import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";
import { transactionGenerator } from "./transactions";

type TransactionsQuery = Partial<{
  institutionID: number,
}>;

const registerTransactionFiltersRoute: GenerateRouteFn = s => s.get<{
  Querystring: TransactionsQuery
}>('/transactions/filters', (req, reply) => {
  const { institutionID } = req.query;
  const { cache } = transactionGenerator;

  if (!institutionID) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);

  const transactions = cache[institutionID];

  if (!transactions?.length) return DATA_OK(reply, {
    cardID: [],
    cardAccount: [],
    currency: [],
  });

  const cardIDs = [...new Set(transactions.map(t => t.cardID))].sort();
  const cardAccount = [...new Set(transactions.map(t => t.cardAccount))].sort();
  const currency = [...new Set(transactions.map(t => t.currency))];

  return DATA_OK(reply, {
    cardIDs: cardIDs,
    cardAccount,
    currency,
  });
});

export default registerTransactionFiltersRoute;