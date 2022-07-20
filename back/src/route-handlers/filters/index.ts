import type { GenerateRouteFn } from "../../types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import { cardsGenerator, getCards } from "../cards";
import { getAccounts } from "../account";
import { transactionGenerator } from "../transactions";
import type { Card } from "../cards/types";
import type { Account } from "../account/types";
import type * as T from "./types";
import { transactionFilterQueryParser } from "./parser";

const registerFiltersRoute: GenerateRouteFn = s => s.get<{
  Querystring: T.FiltersQuery
}>('/filters', (req, reply) => {
  const { institutionID, filterFor } = transactionFilterQueryParser(req.query);
  
  if (!institutionID || !filterFor) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);

  const { cache } = filterFor === 'transactions' ? transactionGenerator : cardsGenerator;

  const data = cache[parseInt(`${institutionID}`, 10)];

  const emptyResponse: Record<string, []> = { cardIDs: [], cardAccount: [], currency: [] };
  if (filterFor === 'cards') emptyResponse['status'] = [];

  if (!data?.length) return DATA_OK(reply, emptyResponse);

  const cardIDs: T.CardFilter[] = [...new Set(data.map(d => d.cardID))]
    .sort((a, b) => a - b)
    .map(id => {
      const card = getCards(parseInt(`${institutionID}`, 10), { cardID: id as number }).cards[0];
      return card ? { cardID: card.cardID, maskedCardNumber: card.maskedCardNumber } : undefined;
    })
    .filter(card => card !== undefined) as Card[]
  
  const cardAccount: T.AccountFilter[] = [...new Set(data.map(d => d.cardAccount))]
    .sort((a, b) => a - b)
    .map(id => {
      const acc = getAccounts(parseInt(`${institutionID}`, 10), { accountID: id as number })[0];
      return acc ? { id: acc.id, firstName: acc.firstName, lastName: acc.lastName } : undefined;
    }) 
    .filter(acc => acc !== undefined) as Account[];
  
  const currency = [...new Set(data.map(t => t.currency))];

  const filledResponse: Record<string, any[]> = { cardIDs, cardAccount, currency };
  if (filterFor === 'cards') {
    filledResponse['status'] = [... new Set((data as Card[]).map(d => d.status))];
  }

  return DATA_OK(reply, filledResponse);
});

export default registerFiltersRoute;