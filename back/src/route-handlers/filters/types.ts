import type { Card } from "../cards/types";
import type { Account } from "../account/types";

export type FiltersQuery = Partial<{
  institutionID: string,
  filterFor: string,
}>;

export type ParsedFitlersQuery = {
  institutionID?: number | undefined,
  filterFor?: 'transactions' | 'cards' | undefined,
};

export type CardFilter = Pick<Card, 'cardID' | 'maskedCardNumber'>;
export type AccountFilter = Pick<Account, 'firstName' | 'lastName' | 'id'>;