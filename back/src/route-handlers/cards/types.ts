import type Currency from "../../constants/currency";

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
  cardID: string,
}>;

export type CardsFilter = {
  cardID?: number | undefined,
}

export type ParsedCardsQuery = {
  institutionID: number | undefined,
  filter: CardsFilter;
};

