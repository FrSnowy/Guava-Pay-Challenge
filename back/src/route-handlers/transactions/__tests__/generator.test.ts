import transactionGenerator from "../generator";

describe('Account generator', () => {
  test('Should generate account', () => {
    const transactions = transactionGenerator
      .generate(10, 0, { allowedCardIDs: [1], allowedAccounts: [2]}, true);

    transactions.forEach((t, i) => {
      expect(t?.transactionID).toBe(i + 1);
      expect(t?.cardID).toBe(1);
      expect(t.cardAccount).toBe(2);
      expect(t?.currency).toBeDefined();
      expect(t.transactionDate).toBeDefined();
      expect(t.amount).toBeDefined();
      expect(t.merchantInfo).toBeDefined();
    
      expect(t).toStrictEqual(transactionGenerator.cache[0]?.[i]);
    });
  });
});