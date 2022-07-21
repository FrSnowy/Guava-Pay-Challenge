import { getAccounts } from "..";
import accountGenerator from "../generator";

describe('Accounts route', () => {
  test('Should return empty list if no accounts presented', () => {
    const accs = getAccounts(0, {});
    expect(accs).toStrictEqual([]);
  });

  test('should return full list of accounts if no filters presented', () => {
    const cache = accountGenerator.generate(10, 1, {}, true);
    const accs = getAccounts(1, {});
    expect(accs).toStrictEqual(cache);
  });

  test('should return filtered accounts if account id filter presented', () => {
    accountGenerator.generate(50, 0, {}, true);
    const accs = getAccounts(0, { accountID: 1 });
    expect(accs.every(acc => acc.id === 1)).toBe(true);
  })
})