export type Account = {
  id: number,
  institutionID: number | string,
  firstName: string,
  lastName: string,
}

export type AccountQuery = Partial<{
  institutionID: string,
  accountID: string,
}>;

export type AccountFilter = {
  accountID?: number | undefined,
}

export type ParsedAccountQuery = {
  institutionID: number | undefined,
  filter: AccountFilter;
};