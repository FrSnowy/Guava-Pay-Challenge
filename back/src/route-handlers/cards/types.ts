import type Currency from "../../constants/currency";
import type { Account } from "../account/types";

export type Card = {
  cardAccount: number,
  cardID: number,
  maskedCardNumber: string,
  expireDate: string,
  currency: Currency
  status: 'active' | 'blocked',
  balance: number,
}

export type CardGeneratorData = {
  allowedAccounts: number[]
}

export type CardsQuery = Partial<{
  institutionID: string,
  offset: string,
  limit: string,
  cardID: string,
  accountID: string,
  currency: string,
  status: string,
}>;

export type CardsFilters = {
  offset?: number | undefined,
  limit?: number | undefined,
  cardID?: number | undefined,
  accountID?: number | undefined,
  currency?: Currency | undefined,
  status?: 'active' | 'blocked' | undefined,
}

export type ParsedCardsQuery = {
  institutionID: number | undefined,
  filter: CardsFilters;
};

export type CardResponse = Card & {
  cardAccountMeta: Account | undefined,
};

export type CardsFilter = (t: Card) => boolean;