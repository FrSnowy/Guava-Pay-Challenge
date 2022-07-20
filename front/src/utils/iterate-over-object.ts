const iterateOverObject = (
  obj: Record<string, unknown>,
  iterator: (k: string, v: string) => void
) => {
  Object.keys(obj).forEach((k) => {
    const v = obj[k as keyof typeof obj];
    if (typeof v === 'object') {
      v && iterateOverObject(v as Record<string, unknown>, iterator);
      return;
    }

    iterator(`${k}`, `${v}`);
  });
};

export default iterateOverObject;
