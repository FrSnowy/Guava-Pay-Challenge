const createQS = (
  baseURL: `/${string}`,
  params: Record<string, unknown>
): `/${string}` => {
  const urlParams = Object.keys(params)
    .map((k) => {
      k = k as keyof typeof params;
      if (params[k] === undefined || params[k] === null) return null;
      if (Array.isArray(params[k])) {
        params[k] = JSON.stringify(params[k]);
      }

      const encodedKey = encodeURIComponent(k);
      const val = encodeURIComponent(params[k] as string);
      return `${encodedKey}=${val}`;
    })
    .filter((v) => !!v);

  if (urlParams.length === 0) return baseURL;
  return `${baseURL}?${urlParams.join('&')}`;
};

export default createQS;
