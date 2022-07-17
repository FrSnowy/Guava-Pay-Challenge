const BASE_URL = 'http://localhost:3001';

export type BaseResponseT = {
  statusCode: number,
  error: false | string,
};

const fetch = async <RespT extends BaseResponseT, >(url: `/${string}`, init?: RequestInit): Promise<RespT> => {
  const resp = await window.fetch(`${BASE_URL}${url}`, init);
  const json = await resp.json();
  return json as RespT;
}

export default fetch;