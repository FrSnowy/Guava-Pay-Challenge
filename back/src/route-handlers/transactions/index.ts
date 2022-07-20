import type { GenerateRouteFn } from "../../types";
import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import { getAccounts } from "../account";
import getStrDateMs from "../../utils/get-str-date-ms";
import type * as T from "./types";
import { transactionsQueryParser } from "./parsers";
import transactionGenerator from "./generator";
import supportOffsetLimit from "../../utils/support-offset-limit";
import { getCards } from "../cards";

export const getTransactions = (institutionID: number, filters: T.TransactionsFilter) => {
  let { offset = 0, limit, cardID, accountID, transactionID, currency, dateRange, minAmount, maxAmount } = filters;
  if (!transactionGenerator.cache[institutionID]) return { totalCount: 0, transactions: [] };

  const transactionIDFilter: T.TransactionFilter = t => transactionID ? t.transactionID === transactionID : true;
  const cardIDFilter: T.TransactionFilter = t => cardID ? t.cardID === cardID : true;
  const accountIDFilter: T.TransactionFilter = t => accountID ? t.cardAccount === accountID : true;
  const currencyFilter: T.TransactionFilter = t => currency === undefined ? true : t.currency === currency;
  const dateRangeFilter: T.TransactionFilter = t => {
    if (dateRange === undefined) return true;
    const tDate = getStrDateMs(t.transactionDate);
    const minDate = getStrDateMs(dateRange[0]);
    const maxDate = getStrDateMs(dateRange[1]);
    return tDate >= minDate && tDate <= maxDate;
  };
  const amountRangeFilter: T.TransactionFilter = t => {
    if (minAmount === undefined && maxAmount === undefined) return true;
    if (minAmount !== undefined && maxAmount === undefined) return t.amount >= minAmount;
    if (minAmount === undefined && maxAmount !== undefined) return t.amount <= maxAmount;
    return t.amount >= minAmount! && t.amount <= maxAmount!;
  };

  const filteredTransactions: T.Transaction[] = transactionGenerator.cache[institutionID]!
    .filter(transactionIDFilter)
    .filter(cardIDFilter)
    .filter(accountIDFilter)
    .filter(currencyFilter)
    .filter(dateRangeFilter)
    .filter(amountRangeFilter);

  const transactions: T.TransactionResponse[] = supportOffsetLimit(filteredTransactions, offset, limit)
    .sort((a, b) => Date.parse(b.transactionDate) - Date.parse(a.transactionDate))
    .map(transaction => ({
      ...transaction,
      cardAccountMeta: getAccounts(institutionID, { accountID: transaction.cardAccount })[0],
      cardMeta: getCards(institutionID, { cardID: transaction.cardID }).cards[0],
    }));

  return { totalCount: filteredTransactions.length, transactions };
}

const registerTransactionsRoute: GenerateRouteFn = s => s.get<{
  Querystring: T.TransactionsQuery
}>('/transactions', (req, reply) => {
  const { institutionID, filter } = transactionsQueryParser(req.query);
  if (!institutionID) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  return DATA_OK(reply, getTransactions(institutionID, filter));
});

export { default as transactionGenerator } from './generator';
export default registerTransactionsRoute;