import createCachedGenerator from "../utils/create-cached-generator";
import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";
import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";

type Transaction = {
  transactionID: number,
  cardAccount: number,
  cardID: number,
  amount: number,
  currency: Currency,
  transactionDate: string,
  merchantInfo: string,
}

type GeneratorOptData = {
  allowedCardIDs: number[]
}

const generateTransaction = (forAccount: number, i: number, data?: GeneratorOptData): Transaction => ({
  transactionID: i,
  cardAccount: forAccount,
  cardID: 
    (data?.allowedCardIDs && data.allowedCardIDs.length > 0)
      ? randomFrom(data.allowedCardIDs as [number, ...number[]])
      : randomIntFromInterval(0, 1000),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  transactionDate: randomDateTime(),
  amount: randomIntFromInterval(0, 1000),
  merchantInfo: randomFrom(['Merchant info 1', 'Merchant info 2', 'Merchant info 3']),
});

export const transactionGenerator = createCachedGenerator<Transaction, GeneratorOptData>(generateTransaction);

type TransactionsQuery = Partial<{
  accountID: number,
  limit: number,
  offset: number,
}>;

const registerTransactionsRoute: GenerateRouteFn = s => s.get<{
  Querystring: TransactionsQuery
}>('/transactions', (req, reply) => {
  let { accountID, offset = 0, limit } = req.query;
  offset = parseInt(`${offset}`, 10);
  limit = parseInt(`${limit}`, 10);

  if (!accountID) {
    return NO_PARAMETER_RESPONSE(reply, ['accountID']);
  }

  if (!transactionGenerator.cache[accountID]) return DATA_OK(reply, { transactions: [], totalCount: 0 });

  const transactions = transactionGenerator.cache[accountID]!
    .slice(offset, limit ? offset + limit : undefined)
    .sort((a, b) => Date.parse(b.transactionDate) - Date.parse(a.transactionDate));

  return DATA_OK(reply, { transactions, totalCount: transactionGenerator.cache[accountID]!.length });
});

export default registerTransactionsRoute;