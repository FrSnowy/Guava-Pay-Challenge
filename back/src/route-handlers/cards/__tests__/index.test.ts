import { getCards } from "..";
import Currency from "../../../constants/currency";
import { randomFrom, randomIntFromInterval } from "../../../utils/random";
import cardsGenerator from '../generator';

describe('Cards route', () => {
  test('Should return empty list if no cards presented', () => {
    const cards = getCards(0, {});
    expect(cards.cards).toStrictEqual([]);
    expect(cards.totalCount).toBe(0);
  });

  test('should return full list of cards if no filters presented', () => {
    const cache = cardsGenerator.generate(10, 0, { allowedAccounts: [0] }, true);
    const cards = getCards(0, {});
    expect(cards.cards).toStrictEqual(cache.map(v => ({ ...v, cardAccountMeta: undefined })));
    expect(cards.totalCount).toBe(cardsGenerator.cache[0]?.length);
  });

  test('should return filtered cards if card id filter presented', () => {
    const cache = cardsGenerator.generate(10, 0, { allowedAccounts: [0] }, true);
    const cardID = randomIntFromInterval(1, cache.length || 1);
    const cards = getCards(0, { cardID});
    expect(cards.cards.every(c => c.cardID === cardID)).toBe(true);
  });

  test('should return filtered cards if account id filter presented', () => {
    const ALLOWED_ACCS = [0, 1, 2];
    const accID = randomFrom(ALLOWED_ACCS as [number, ...number[]]);
    cardsGenerator.generate(10, 0, { allowedAccounts: ALLOWED_ACCS }, true);
    const cards = getCards(0, { accountID: accID });
    expect(cards.cards.every(c => c.cardAccount === accID)).toBe(true);
  });

  test('should return filtered cards if currency filter presented', () => {
    const currency = randomFrom([Currency.EUR, Currency.USD, Currency.AZN]);
  
    cardsGenerator.generate(10, 0, { allowedAccounts: [0] }, true);
    const cards = getCards(0, { currency });
    expect(cards.cards.every(c => c.currency === currency)).toBe(true);
  });

  test('should return filtered cards if status filter presented', () => {
    const status = randomFrom<'active' | 'blocked'>(['active', 'blocked']);

    cardsGenerator.generate(10, 0, { allowedAccounts: [0] }, true);
    const cards = getCards(0, { status });
    expect(cards.cards.every(c => c.status === status)).toBe(true);
  });
})