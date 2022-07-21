import { getTransactions } from "..";
import Currency from "../../../constants/currency";
import { randomFrom, randomIntFromInterval } from "../../../utils/random";
import transactionsGenerator from '../generator';

describe('Transactions route', () => {
  test('Should return empty list if no transactions presented', () => {
    const transaction = getTransactions(0, {});
    expect(transaction.transactions).toStrictEqual([]);
    expect(transaction.totalCount).toBe(0);
  });

  test('should return full list of transactions if no filters presented', () => {
    const cache = transactionsGenerator.generate(10, 0, { allowedAccounts: [0], allowedCardIDs: [0] }, true);
    const transactions = getTransactions(0, {});
    expect(
      transactions.transactions.every(t => cache.some(ct => ct.transactionID === t.transactionID))
    ).toBe(true);
    expect(transactions.totalCount).toBe(transactionsGenerator.cache[0]?.length);
  });

  test('should return filtered transactions if transactionID filter presented', () => {
    const cache = transactionsGenerator.generate(10, 0, { allowedAccounts: [0], allowedCardIDs: [0] }, true);
    const transactionID = randomIntFromInterval(1, cache.length || 1);
    const transactions = getTransactions(0, { transactionID });
    expect(transactions.transactions.every(t => t.transactionID === transactionID)).toBe(true);
  });

  test('should return filtered transactions if accountID filter presented', () => {
    const ALLOWED_ACCS = [0, 1, 2];
    const accID = randomFrom(ALLOWED_ACCS as [number, ...number[]]);
    transactionsGenerator.generate(10, 0, { allowedAccounts: ALLOWED_ACCS, allowedCardIDs: [0] }, true);
    const transactions = getTransactions(0, { accountID: accID });
    expect(transactions.transactions.every(t => t.cardAccount === accID)).toBe(true);
  });

  test('should return filtered transactions if cardID filter presented', () => {
    const ALLOWED_CARDS = [0, 1, 2];
    const cardID = randomFrom(ALLOWED_CARDS as [number, ...number[]]);
    transactionsGenerator.generate(10, 0, { allowedAccounts: [0], allowedCardIDs: ALLOWED_CARDS }, true);
    const transactions = getTransactions(0, { cardID });
    expect(transactions.transactions.every(t => t.cardID === cardID)).toBe(true);
  });

  test('should return filtered cards if currency filter presented', () => {
    const currency = randomFrom([Currency.EUR, Currency.USD, Currency.AZN]);
  
    transactionsGenerator.generate(10, 0, { allowedAccounts: [0], allowedCardIDs: [0] }, true);
    const transactions = getTransactions(0, { currency });
    expect(transactions.transactions.every(c => c.currency === currency)).toBe(true);
  });

  test('should return filtered cards if minAmount filter presented', () => {
    const minAmount = randomIntFromInterval(10, 100);
    transactionsGenerator.generate(10, 0, { allowedAccounts: [0], allowedCardIDs: [0] }, true);
    const transactions = getTransactions(0, { minAmount });
    expect(transactions.transactions.every(c => c.amount >= minAmount)).toBe(true);
  });

  test('should return filtered cards if maxAmount filter presented', () => {
    const maxAmount = randomIntFromInterval(100, 250);
    transactionsGenerator.generate(10, 0, { allowedAccounts: [0], allowedCardIDs: [0] }, true);
    const transactions = getTransactions(0, { maxAmount });
    expect(transactions.transactions.every(c => c.amount <= maxAmount)).toBe(true);
  });
})