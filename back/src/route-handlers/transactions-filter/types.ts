import type { Card } from "../cards/types";
import type { Account } from "..//account/types";

export type TransactionsFilterQuery = Partial<{
  institutionID: string,
}>;

export type ParsedTransactionsFitlerQuery = {
  institutionID?: number | undefined;
}

export type CardFilter = Pick<Card, 'cardID' | 'maskedCardNumber'>;
export type AccountFilter = Pick<Account, 'firstName' | 'lastName' | 'id'>;