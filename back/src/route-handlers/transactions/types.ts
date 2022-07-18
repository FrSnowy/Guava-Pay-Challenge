import type { Account } from "../account/types";
import type Currency from "../../constants/currency";

export type Transaction = {
  transactionID: number,
  cardAccount: number,
  cardID: number,
  amount: number,
  currency: Currency,
  transactionDate: string,
  merchantInfo: string,
}

export type TransactionsQuery = Partial<{
  institutionID: string,
  limit: string,
  offset: string,
  cardID: string,
  accountID: string,
  transactionID: string,
  currency: string,
  dateRange: string,
  minAmount: string,
  maxAmount: string,
}>;

export type TransactionsFilter = {
  limit: number | undefined,
  offset: number | undefined,
  cardID: number | undefined,
  accountID: number | undefined,
  transactionID: number | undefined,
  currency: Currency | undefined,
  dateRange: [string, string] | undefined,
  minAmount: number | undefined,
  maxAmount: number | undefined,
}

export type ParsedTransactionsQuery = {
  institutionID: number | undefined,
  filter: TransactionsFilter;
};

export type TransactionResponse = Transaction & {
  cardAccountMeta: Account | undefined,
};

export type TransactionFilter = (t: Transaction) => boolean;