import { randomIntFromInterval } from "../../../utils/random";
import { transactionFilterQueryParser } from "../parser";

describe('Transaction filter query parser', () => {
  test('Should parse correct values', () => {
    const rndInstID = randomIntFromInterval(5, 100);
    const status = ['transactions', 'cards'];

    status.forEach(st => {
      const { institutionID, filterFor } = transactionFilterQueryParser({
        institutionID: `${rndInstID}`,
        filterFor: st
      });

      expect(institutionID).toBe(rndInstID);
      expect(filterFor).toBe(st);
    });
  });

  test('Should return undefined filterFor for wrong status', () => {
    const status = 'unknown status';
    const { institutionID, filterFor } = transactionFilterQueryParser({ institutionID: 'bebebe', filterFor: status });
    expect(institutionID).toBeUndefined();
    expect(filterFor).toBeUndefined();
  });
})