import getStrDateMS from '../get-str-date-ms';
import * as random from '../random';

describe("Random values generators", () => {
  test("Should generate random number between two", () => {
    const MIN = random.randomIntFromInterval(0, 5);
    const MAX = random.randomIntFromInterval(10, 15);
  
    let v = random.randomIntFromInterval(MIN, MAX);
    expect(v >= MIN && v <= MAX).toBe(true);

    const MIN_BUT_IT_IS_MAX = random.randomIntFromInterval(100, 1000);
    const MAX_BUT_IT_IS_MIN = random.randomIntFromInterval(0, 50);

    v = random.randomIntFromInterval(MIN_BUT_IT_IS_MAX, MAX_BUT_IT_IS_MIN);
    expect(v >= MAX_BUT_IT_IS_MIN && v <= MIN_BUT_IT_IS_MAX); 

    const MIN_AND_MAX = random.randomIntFromInterval(5, 5);
    v = random.randomIntFromInterval(MIN_AND_MAX, MIN_AND_MAX);
    expect(v).toBe(MIN_AND_MAX);
  });

  test("Should return random value from list", () => {
    const LIST = [1, 2, 3, 4, 5] as [number, ...number[]];
    let v = random.randomFrom(LIST);
    const filteredV = LIST.filter(lv => lv !== v);
    expect(LIST.length - filteredV.length).toBe(1);

    const SINGLE_LIST = [1];
    v = random.randomFrom(SINGLE_LIST as [number, ...number[]]);
    expect(v).toBe(SINGLE_LIST[0]); 
  });

  test("Should return correct random date", () => {
    const date = random.randomDateTime();
    expect(getStrDateMS(date) !== -1).toBe(true);
  })
});