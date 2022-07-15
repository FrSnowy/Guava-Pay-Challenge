import type fastify from "fastify";
import createCachedGenerator from "../utils/create-cached-generator";
import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";

type Transaction = {
  transactionID: number,
  cardAccount: number,
  cardID: number,
  amount: number,
  currency: Currency,
  transactionDate: string,
  merchantInfo: string,
}

const generateTransaction = (forAccount: number, i: number): Transaction => ({
  transactionID: i,
  cardAccount: forAccount,
  cardID: randomIntFromInterval(0, 1000),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  transactionDate: randomDateTime(),
  amount: randomIntFromInterval(0, 1000),
  merchantInfo: randomFrom(['Merchant info 1', 'Merchant info 2', 'Merchant info 3']),
});

const generateTransactionWithCache = createCachedGenerator(generateTransaction);

type TransactionsQuery = Partial<{
  accountID: number,
  count: number,
}>;

const registerTransactionsRoute = (s: ReturnType<typeof fastify>) => s.get<{
  Querystring: TransactionsQuery
}>('/transactions', (req) => {
  if (!req.query.accountID) return [];
  return generateTransactionWithCache(req.query.count || 20, req.query.accountID);
});

export default registerTransactionsRoute;