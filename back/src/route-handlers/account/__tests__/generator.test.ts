import accountGenerator from "../generator";

describe('Account generator', () => {
  test('Should generate account', () => {
    const accs = accountGenerator.generate(10, 0, {}, true);

    accs.forEach((acc, i) => {
      expect(acc?.id).toBe(i + 1);
      expect(acc?.firstName).toBeDefined();
      expect(acc?.lastName).toBeDefined();
      expect(acc?.institutionID).toBe(0);
      expect(accs[i]).toStrictEqual(accountGenerator.cache[0]?.[i]);
    });
  });
});