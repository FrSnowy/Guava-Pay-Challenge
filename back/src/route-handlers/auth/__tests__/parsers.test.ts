import { randomFrom } from "../../../utils/random";
import { authBodyParser } from "../parsers";
import type { AuthBody } from "../types";

describe('Auth body parser', () => {
  test('Should get account from body', () => {
    const ACC_NAME = randomFrom(['ATEST', 'BTEST', 'CTEST'])
    const body = JSON.stringify({ account: ACC_NAME });
    const v = authBodyParser(body);
    expect((v as AuthBody).account).toBe(ACC_NAME);
  });

  test('Should return false if account is not presented', () => {
    const body = JSON.stringify({});
    const v = authBodyParser(body);
    expect(v).toBeFalsy();
  })
})