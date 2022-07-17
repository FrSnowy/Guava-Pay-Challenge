const createQS = (baseURL: `/${string}`, params: Record<string, any>): `/${string}` => {
  const urlParams = Object.keys(params).map(k => {
    k = k as keyof typeof params;
    if (params[k] === undefined || params[k] === null) return null;
    const encodedKey = encodeURIComponent(k);
    const val = encodeURIComponent(params[k]);
    return `${encodedKey}=${val}`;
  }).filter(v => !!v);

  if (urlParams.length === 0) return baseURL;
  return `${baseURL}?${urlParams.join('&')}`;
}

export default createQS;