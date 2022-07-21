import strToNumOrUndefined from "../str-to-num-or-undefined";

describe('Should convert string to number or to undefined', () => {
  test('Should parse string to number', () => {
    expect(strToNumOrUndefined('5')).toBe(5);
    expect(strToNumOrUndefined('-1')).toBe(-1);
  });

  test('Should return undefined to empty strings', () => {
    expect(strToNumOrUndefined('')).toBe(undefined);
  });

  test('Should retrun undefined to undefined', () => {
    expect(strToNumOrUndefined(undefined)).toBe(undefined);
  })
});