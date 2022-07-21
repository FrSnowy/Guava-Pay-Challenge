import createCachedGenerator from "../create-cached-generator";

describe("Mock data generator creator function", () => {
  test("fn should create generator and cache objects", () => {
    const gen = createCachedGenerator(() => void 0);
    expect(gen.cache).toBeDefined();
    expect(gen.generate).toBeDefined();
  });

  test('created function must fill cache with values', () => {
    const gen = createCachedGenerator((_, i) => i);
    const ARR_SIZE = 1000;
    const arr = Array(ARR_SIZE).fill(null).map((_, i) => i);
    gen.generate(ARR_SIZE, 0, {});

    expect(gen.cache).toStrictEqual({
      0: arr
    });
  });

  test('create function must fill cache for different institutions', () => {
    const gen = createCachedGenerator((_, i) => i);
    gen.generate(1, 1, {});
    expect(gen.cache[0]).toBeUndefined();
    expect(gen.cache[1]).toStrictEqual([0]);
  });

  test('create function must return values from cache', () => {
    const gen = createCachedGenerator((_, i) => ({ v: i }));
    const COUNT = 10;
    gen.generate(COUNT, 0, {});

    const v = gen.generate(1, 0, {})[0];
    expect(v).toStrictEqual(gen.cache[0]![0]);
  });

  test('create function must expand cache if user trying to generate more values then exists in cache for now', () => {
    const gen = createCachedGenerator((_, i) => i);
    const COUNT = 5;
    const NEXT_COUNT = 10;

    gen.generate(COUNT, 0, {});
    expect(gen.cache[0]?.length).toBe(COUNT);

    gen.generate(NEXT_COUNT, 0, {});
    expect(gen.cache[0]?.length).toBe(NEXT_COUNT);
  });

  test('should support force cache reset', () => {
    const gen = createCachedGenerator(() => new Date().toISOString());
    const COUNT = 5;

    gen.generate(COUNT, 0, {});
    expect(gen.cache[0]?.length).toBe(COUNT);

    const vals = gen.generate(COUNT, 0, {}, true);
    expect(vals[0] !== gen.cache[0]).toBe(true);
  });
});