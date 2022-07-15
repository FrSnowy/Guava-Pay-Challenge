const createCachedGenerator = <T>(generateOne: (forAccount: number, i: number) => T) => {
  const cacheForID: Record<number, T[]> = {};

  const genFn = (count: number, forAccount: number): T[] => {
    const list: T[] = cacheForID[forAccount] || [];
    if (list.length > 0 && list.length >= count) return list.slice(0, count);

    cacheForID[forAccount] =  [...list];
    for (let i = cacheForID[forAccount]!.length; i < count; i++) {
      cacheForID[forAccount]!.push(generateOne(forAccount, i))
    }

    return cacheForID[forAccount]!;
  }

  return genFn;
}

export default createCachedGenerator;