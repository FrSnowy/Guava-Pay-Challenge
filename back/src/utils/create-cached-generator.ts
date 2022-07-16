const createCachedGenerator = <T, DataT>(generateOne: (forAccount: number, i: number, optData?: DataT) => T) => {
  const cache: Record<number, T[]> = {};

  const generate = (count: number, forAccount: number,  optData?: DataT): T[] => {
    const list: T[] = cache[forAccount] || [];
    if (list.length > 0 && list.length >= count) return list.slice(0, count);

    cache[forAccount] =  [...list];
    for (let i = cache[forAccount]!.length; i < count; i++) {
      cache[forAccount]!.push(generateOne(forAccount, i, optData))
    }

    return cache[forAccount]!;
  }

  return {generate, cache};
}

export default createCachedGenerator;