export type Account = {
  id: number,
  institutionID: number,
  firstName: string,
  lastName: string,
  avatar?: string | undefined,
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