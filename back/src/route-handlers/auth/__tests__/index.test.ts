import { getAccountID } from "..";

describe('Auth route', () => {
  test('Should create new account id', () => {
    const id = getAccountID('first');
    expect(id).toStrictEqual(1);

    const id2 = getAccountID('second');
    expect(id2).toStrictEqual(2);
  });

  test('Should return existing id for existing acc', () => {
    const id = getAccountID('second');
    expect(id).toStrictEqual(2);
  });
})