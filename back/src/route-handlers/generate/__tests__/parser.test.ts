import { randomIntFromInterval } from "../../../utils/random";
import { generateBodyParser } from "../parser";
import type { ParsedGenerateBody } from "../types";

describe('Generate body parser', () => {
  test('Should get institution id from body', () => {
    const id = randomIntFromInterval(1, 10);
    const body = JSON.stringify({ institutionID: id });
    const v = generateBodyParser(body);
    expect((v as ParsedGenerateBody).institutionID).toBe(id);
  });

  test('Should return false if institution id is not presented', () => {
    const body = JSON.stringify({});
    const v = generateBodyParser(body);
    expect(v).toBeFalsy();
  })
});
