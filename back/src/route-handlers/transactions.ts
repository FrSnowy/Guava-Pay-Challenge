import createCachedGenerator from "../utils/create-cached-generator";
import Currency from "../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../utils/random";
import type { GenerateRouteFn } from "types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../constants/responses";
import { Account, getAccounts } from "./accounts";
import getStrDateMs from "../utils/get-str-date-ms";

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

const generateTransaction = (_: number | string, i: number, data: GeneratorOptData): Transaction => ({
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
  institutionID: number | string,
  filters: Omit<TransactionsQuery, 'institutionID'>,
): { totalCount: number, transactions: TransactionResponse[] } => {
  let { offset = 0, limit, cardID, accountID, currency, dateRange, minAmount, maxAmount } = filters;

  const parsedDateRange: [string, string] | undefined = dateRange ? JSON.parse(dateRange) : undefined;

  if (!transactionGenerator.cache[institutionID]) return { totalCount: 0, transactions: [] };
  offset = parseInt(`${offset}`, 10);
  limit = parseInt(`${limit}`, 10);
  cardID = parseInt(`${cardID}`, 10);
  accountID = parseInt(`${accountID}`, 10);

  const minNumericAmount = parseInt(`${minAmount}`, 10);
  const maxNumericAmount = parseInt(`${maxAmount}`, 10);

  const filteredTransactions: Transaction[] = transactionGenerator.cache[institutionID]!
    .filter(transaction => cardID ? transaction.cardID === cardID : true)
    .filter(transaction => accountID ? transaction.cardAccount === accountID : true)
    .filter(transaction => currency ? transaction.currency === currency : true)
    .filter(transaction => {
      if (!parsedDateRange) return true;
      const tDate = getStrDateMs(transaction.transactionDate);
      const minDate = getStrDateMs(parsedDateRange[0]);
      const maxDate = getStrDateMs(parsedDateRange[1]);
      return tDate >= minDate && tDate <= maxDate;
    })
    .filter(transaction => {
      if (Number.isNaN(minNumericAmount) && Number.isNaN(maxNumericAmount)) return true;
      if (!Number.isNaN(minNumericAmount) && Number.isNaN(maxNumericAmount)) {
        return transaction.amount >= minNumericAmount;
      }
      if (!Number.isNaN(maxNumericAmount) && Number.isNaN(minNumericAmount)) {
        return transaction.amount <= maxNumericAmount;
      }
      return transaction.amount >= minNumericAmount && transaction.amount <= maxNumericAmount;
    });

  const transactions: TransactionResponse[] = filteredTransactions
      .slice(offset, limit ? offset + limit : undefined)
      .sort((a, b) => Date.parse(b.transactionDate) - Date.parse(a.transactionDate))
      .map(transaction => ({
        ...transaction,
        cardAccountMeta: getAccounts(institutionID, { accountID: transaction.cardAccount })[0]
      }))

  return { totalCount: filteredTransactions.length, transactions };
}

type TransactionsQuery = Partial<{
  institutionID: number | string,
  limit: number | string,
  offset: number | string,
  cardID: number | string,
  accountID: number | string,
  currency: string,
  dateRange: string,
  minAmount: number | string,
  maxAmount: number | string,
}>;

const registerTransactionsRoute: GenerateRouteFn = s => s.get<{
  Querystring: TransactionsQuery
}>('/transactions', (req, reply) => {
  const { institutionID, ...filters } = req.query;
  if (!institutionID) {
    return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  }

  const transactions = getTransactions(institutionID, filters);
  return DATA_OK(reply, transactions);
});

export default registerTransactionsRoute;