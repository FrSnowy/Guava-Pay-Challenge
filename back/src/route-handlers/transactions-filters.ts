import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";
import { Account, getAccounts } from "./accounts";
import { Card, getCards } from "./cards";
import { transactionGenerator } from "./transactions";

type TransactionsQuery = Partial<{
  institutionID: number,
}>;

type CardFilter = Pick<Card, 'cardID' | 'maskedCardNumber'>;
type AccountFilter = Pick<Account, 'firstName' | 'lastName' | 'id'>;

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

  const cardIDs: CardFilter[] = [...new Set(transactions.map(t => t.cardID))]
    .sort()
    .map(id => {
      const card = getCards(institutionID, { cardID: id })[0];
      return card ? { cardID: card.cardID, maskedCardNumber: card.maskedCardNumber } : undefined;
    })
    .filter(card => card !== undefined) as Card[]
  
  const cardAccount: AccountFilter[] = [...new Set(transactions.map(t => t.cardAccount))]
    .sort()
    .map(id => {
      const acc = getAccounts(institutionID, { accountID: id })[0];
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