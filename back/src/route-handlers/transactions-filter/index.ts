import type { GenerateRouteFn } from "../../types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import { getCards } from "../cards";
import { getAccounts } from "../account";
import { transactionGenerator } from "../transactions";
import type { Card } from "../cards/types";
import type { Account } from "../account/types";
import type * as T from "./types";
import { transactionFilterQueryParser } from "./parser";

const registerTransactionFiltersRoute: GenerateRouteFn = s => s.get<{
  Querystring: T.TransactionsFilterQuery
}>('/transactions/filters', (req, reply) => {
  const { institutionID } = transactionFilterQueryParser(req.query);
  const { cache } = transactionGenerator;

  if (institutionID === undefined) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);

  const transactions = cache[parseInt(`${institutionID}`, 10)];

  if (!transactions?.length) return DATA_OK(reply, {
    cardID: [],
    cardAccount: [],
    currency: [],
  });

  const cardIDs: T.CardFilter[] = [...new Set(transactions.map(t => t.cardID))]
    .sort()
    .map(id => {
      const card = getCards(parseInt(`${institutionID}`, 10), { cardID: id as number })[0];
      return card ? { cardID: card.cardID, maskedCardNumber: card.maskedCardNumber } : undefined;
    })
    .filter(card => card !== undefined) as Card[]
  
  const cardAccount: T.AccountFilter[] = [...new Set(transactions.map(t => t.cardAccount))]
    .sort()
    .map(id => {
      const acc = getAccounts(parseInt(`${institutionID}`, 10), { accountID: id as number })[0];
      return acc ? { id: acc.id, firstName: acc.firstName, lastName: acc.lastName } : undefined;
    }) 
    .filter(acc => acc !== undefined) as Account[];
  
  const currency = [...new Set(transactions.map(t => t.currency))];

  return DATA_OK(reply, {
    cardIDs: cardIDs,
    cardAccount,
    currency,
  });
});

export default registerTransactionFiltersRoute;