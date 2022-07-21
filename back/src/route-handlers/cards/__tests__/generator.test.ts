import cardsGenerator from "../generator";

describe('Cards generator', () => {
  test('Should generate cards', () => {
    const cards = cardsGenerator.generate(10, 0, { allowedAccounts: [0] }, true);

    cards.forEach((c, i) => {
      expect(c?.cardID).toBe(i + 1);
      expect(c?.balance).toBeDefined();
      expect(c?.cardAccount).toBe(0);
      expect(c?.currency).toBeDefined();
      expect(c?.expireDate).toBeDefined();
      expect(c?.maskedCardNumber).toBeDefined();
      expect(c?.status).toBeDefined();
      expect(cards[i]).toStrictEqual(cardsGenerator.cache[0]?.[i]);
    });
  });
});