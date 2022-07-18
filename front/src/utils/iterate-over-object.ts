const iterateOverObject = (obj: Object, iterator: (k: string, v: string) => void) => {
  Object.keys(obj).forEach(k => {
    const v = obj[k as keyof typeof obj];
    if (typeof v === 'object') {
      iterateOverObject(v, iterator);
      return;
    }

    iterator(k.toString(), v.toString());
  });
}

export default iterateOverObject;