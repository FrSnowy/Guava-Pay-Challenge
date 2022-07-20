import AuthModelInstance, { SESSION_ID_NAME } from "@/features/Auth/Auth.model";
import iterateOverObject from "@/utils/iterate-over-object";

const BASE_URL = 'http://localhost:3001';

export type BaseResponseT = {
  statusCode: number,
  error: false | string,
};

const cache = new Map<string, object>();

export const clearFetchCache = () => cache.clear();

const getArgsHash = (url: string, init?: RequestInit): string | false => {
  if (init && init.method !== 'GET') return false;

  const object = { institution: AuthModelInstance.institutionID, url, ...init };
  let str = '';
  iterateOverObject(object, (k, v) => str+= `${k}:${v};`);
  return btoa(str);
}

const fetch = async <RespT extends BaseResponseT, >(url: `/${string}`, init?: RequestInit): Promise<RespT> => {
  const argHash = getArgsHash(url, init);
  const cachedValue = argHash ? cache.get(argHash) : undefined;
  if (cachedValue) {
    console.log(`Loaded from cache with key ${argHash}: `, cachedValue);
    return cachedValue as RespT;
  }

  const resp = await window.fetch(`${BASE_URL}${url}`, init);
  const json = await resp.json() as BaseResponseT;

  argHash && cache.set(argHash, json);

  return json as RespT;
}

export default fetch;