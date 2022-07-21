import { randomIntFromInterval } from "../../../utils/random";
import { accountQueryParser } from "../parsers";

describe('Account query parser', () => {
  test('Should parse numeric values', () => {
    const rndInstID = randomIntFromInterval(5, 100);
    const rndAccID = randomIntFromInterval(5, 100);
  
    const { institutionID, filter: { accountID } } = accountQueryParser({
      institutionID: `${rndInstID}`,
      accountID: `${rndAccID}`
    });

    expect(institutionID).toBe(rndInstID);
    expect(accountID).toBe(rndAccID);
  });

  test('Should parse undefined values', () => {
    const rndVal =  randomIntFromInterval(5, 100);
    const { institutionID, filter: { accountID } } = accountQueryParser({
      institutionID: `${rndVal}`,
    });

    expect(accountID).toBeUndefined();
    expect(institutionID).toBe(rndVal);

    const { institutionID: emptyInstitutionID } = accountQueryParser({});
    expect(emptyInstitutionID).toBeUndefined();
  });
})