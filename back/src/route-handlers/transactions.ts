import createCachedGenerator from "../utils/create-cached-generator";
import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";
import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";
import { Account, getAccounts } from "./accounts";

type Transaction = {
  transactionID: number,
  cardAccount: number,
  cardID: number,
  amount: number,
  currency: Currency,
  transactionDate: string,
  merchantInfo: string,
}

type TransactionResponse = Transaction & {
  cardAccountMeta: Account | undefined,
};

type GeneratorOptData = {
  allowedCardIDs: number[],
  allowedAccounts: number[],
}

const generateTransaction = (_: number, i: number, data: GeneratorOptData): Transaction => ({
  transactionID: i,
  cardAccount: randomFrom(data.allowedAccounts as [number, ...number[]]),
  cardID: randomFrom(data.allowedCardIDs as [number, ...number[]]),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  transactionDate: randomDateTime(),
  amount: randomIntFromInterval(0, 1000),
  merchantInfo: randomFrom(['Merchant info 1', 'Merchant info 2', 'Merchant info 3']),
});

export const transactionGenerator = createCachedGenerator<Transaction, GeneratorOptData>(generateTransaction);
export const getTransactions = (
  institutionID: number,
  filters: {
    offset?: number,
    limit?: number,
  }
): TransactionResponse[] => {
  let { offset, limit } = filters;

  if (!transactionGenerator.cache[institutionID]) return [];
  offset = parseInt(`${offset}`, 10);
  limit = parseInt(`${limit}`, 10);

const transactions: TransactionResponse[] = transactionGenerator.cache[institutionID]!
    .slice(offset, limit ? offset + limit : undefined)
    .sort((a, b) => Date.parse(b.transactionDate) - Date.parse(a.transactionDate))
    .map(transaction => ({
      ...transaction,
      cardAccountMeta: getAccounts(institutionID, { accountID: transaction.cardAccount })[0]
    }));

  return transactions;
}

type TransactionsQuery = Partial<{
  institutionID: number,
  limit: number,
  offset: number,
}>;

const registerTransactionsRoute: GenerateRouteFn = s => s.get<{
  Querystring: TransactionsQuery
}>('/transactions', (req, reply) => {
  let { institutionID, offset = 0, limit } = req.query;
  offset = parseInt(`${offset}`, 10);
  limit = parseInt(`${limit}`, 10);

  if (!institutionID) {
    return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  }

  const transactions = getTransactions(institutionID, { offset, limit });
  return DATA_OK(reply, { transactions, totalCount: (transactionGenerator.cache[institutionID] || []).length });
});

export default registerTransactionsRoute;