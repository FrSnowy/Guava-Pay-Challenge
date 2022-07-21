import Currency from "../../../constants/currency";
import { randomFrom, randomIntFromInterval } from "../../../utils/random";
import { cardsQueryParser } from "../parser";

describe('Should parse cards query', () => {
  test('Should parse correct values', () => {
    const id = randomIntFromInterval(1, 100);
    const offset = randomIntFromInterval(1, 100);
    const limit = randomIntFromInterval(1, 100);
    const cardID = randomIntFromInterval(1, 100);
    const accountID = randomIntFromInterval(1, 100);
    const currency = randomFrom([Currency.AZN, Currency.EUR, Currency.USD]);
    const status = randomFrom(['active', 'blocked']);

    const { institutionID, filter } = cardsQueryParser({
      institutionID: `${id}`,
      offset: `${offset}`,
      limit: `${limit}`,
      cardID: `${cardID}`,
      accountID: `${accountID}`,
      currency: `${currency}`,
      status: `${status}`,
    });

    expect(institutionID).toBe(id);
    expect(filter.offset).toBe(offset);
    expect(filter.limit).toBe(limit);
    expect(filter.cardID).toBe(cardID);
    expect(filter.accountID).toBe(accountID);
    expect(filter.currency).toBe(currency);
    expect(filter.status).toBe(status);
  });

  test('Should parse undefined values', () => {
    const id = randomIntFromInterval(1, 100);

    const { institutionID, filter } = cardsQueryParser({ institutionID: `${id}` });
    expect(institutionID).toBe(id);
    expect(filter.offset).toBeUndefined();
    expect(filter.limit).toBeUndefined();
    expect(filter.cardID).toBeUndefined();
    expect(filter.accountID).toBeUndefined();
    expect(filter.currency).toBeUndefined();
    expect(filter.status).toBeUndefined();
  })
})