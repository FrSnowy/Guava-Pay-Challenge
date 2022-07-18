const supportOffsetLimit = <T = any[]>(arr: T[], offset?: number, limit?: number): T[] => {
  if (!offset && !limit) return arr;
  return arr.slice(offset, limit ? (offset || 0) + limit : undefined);
};

export default supportOffsetLimit;