import Currency from "../../../constants/currency";
import { randomDateTime, randomFrom, randomIntFromInterval } from "../../../utils/random";
import { transactionsQueryParser } from "../parsers";

describe('Transactions query parser', () => {
  test('Should parse correct values', () => {
    const id = randomIntFromInterval(1, 100);
    const limit = randomIntFromInterval(1, 100);
    const offset = randomIntFromInterval(1, 100);
    const cardID = randomIntFromInterval(1, 100);
    const accountID = randomIntFromInterval(1, 100);
    const transactionID = randomIntFromInterval(1, 100);
    const currency = randomFrom([Currency.AZN, Currency.EUR, Currency.USD]);
    const minAmount = randomIntFromInterval(1, 100);
    const maxAmount = randomIntFromInterval(1, 100);
    const dates = [randomDateTime(), randomDateTime()];

    const { institutionID, filter } = transactionsQueryParser({
      institutionID: `${id}`,
      limit: `${limit}`,
      offset: `${offset}`,
      cardID: `${cardID}`,
      accountID: `${accountID}`,
      transactionID: `${transactionID}`,
      currency: `${currency}`,
      dateRange: JSON.stringify(dates),
      minAmount: `${minAmount}`,
      maxAmount: `${maxAmount}`,
    });

    expect(institutionID).toBe(id);
    expect(filter.offset).toBe(offset);
    expect(filter.limit).toBe(limit);
    expect(filter.cardID).toBe(cardID);
    expect(filter.accountID).toBe(accountID);
    expect(filter.transactionID).toBe(transactionID);
    expect(filter.currency).toBe(currency);
    expect(filter.dateRange![0]).toBe(dates[0]!);
    expect(filter.dateRange![1]).toBe(dates[1]!);
    expect(filter.minAmount).toBe(minAmount);
    expect(filter.maxAmount).toBe(maxAmount);
  });

  test('Should parse undefined values', () => {
    const id = randomIntFromInterval(1, 100);

    const { institutionID, filter } = transactionsQueryParser({ institutionID: `${id}` });
    expect(institutionID).toBe(id);
    expect(filter.offset).toBeUndefined();
    expect(filter.limit).toBeUndefined();
    expect(filter.cardID).toBeUndefined();
    expect(filter.accountID).toBeUndefined();
    expect(filter.transactionID).toBeUndefined();
    expect(filter.currency).toBeUndefined();
    expect(filter.dateRange).toBeUndefined();
    expect(filter.minAmount).toBeUndefined();
    expect(filter.maxAmount).toBeUndefined();
  })
})