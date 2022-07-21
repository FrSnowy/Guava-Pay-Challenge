import { randomIntFromInterval } from "../random";
import supportOffsetLimit from "../support-offset-limit";

describe('Wrapper to fastly get offset and limit params at pagination', () => {
  const ARR = Array(5).fill(null).map(() => randomIntFromInterval(100, 500));

  test('Should handle offset', () => {
    const arrWithOffset = supportOffsetLimit(ARR, 1);
    expect(arrWithOffset).toStrictEqual(ARR.slice(1, ARR.length));
  });

  test('Should handle limit', () => {
    const arrWithLimit = supportOffsetLimit(ARR, undefined, 1);
    expect(arrWithLimit).toStrictEqual([ARR[0]]);
  });

  test('Should handle offset and limit', () => {
    const arrWithLimit = supportOffsetLimit(ARR, 2, 2);
    expect(arrWithLimit).toStrictEqual([ARR[2], ARR[3]]);
  });

  test('Should handle no params', () => {
    const arrWithoutAnything = supportOffsetLimit(ARR);
    expect(arrWithoutAnything).toBe(ARR);
  })
})