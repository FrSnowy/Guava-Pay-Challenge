const strToNumOrUndefined = (numeric?: string): number | undefined => {
  if (!numeric) return undefined;
  const parsed = parseInt(numeric, 10);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
}

export default strToNumOrUndefined;