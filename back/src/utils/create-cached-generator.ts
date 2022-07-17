const createCachedGenerator = <T, DataT = {}>(
  generateOne: (forInstitution: number | string, i: number, optData: DataT) => T
) => {
  const cache: Record<number | string, T[]> = {};

  const generate = (count: number, forInstitution: number, optData: DataT): T[] => {
    const key = `${forInstitution}`;
    const list: T[] = cache[forInstitution] || [];
    if (list.length > 0 && list.length >= count) return list.slice(0, count);

    cache[key] =  [...list];
    for (let i = cache[key]!.length; i < count; i++) {
      cache[key]!.push(generateOne(key, i, optData))
    }

    return cache[key]!;
  }

  return {generate, cache};
}

export default createCachedGenerator;