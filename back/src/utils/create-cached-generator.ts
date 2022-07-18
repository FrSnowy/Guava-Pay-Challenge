const createCachedGenerator = <T, DataT = {}>(
  generateOne: (forInstitution: number, i: number, optData: DataT) => T
) => {
  const cache: Record<number, T[]> = {};

  const generate = (count: number, forInstitution: number, optData: DataT): T[] => {
    const list: T[] = cache[forInstitution] || [];
    if (list.length > 0 && list.length >= count) return list.slice(0, count);

    cache[forInstitution] =  [...list];
    for (let i = cache[forInstitution]!.length; i < count; i++) {
      cache[forInstitution]!.push(generateOne(forInstitution, i, optData))
    }

    return cache[forInstitution]!;
  }

  return {generate, cache};
}

export default createCachedGenerator;