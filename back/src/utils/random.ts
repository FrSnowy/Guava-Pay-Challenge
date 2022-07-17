export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomFrom = <T = any>(arr: [T, ...T[]]) => arr[randomIntFromInterval(0, arr.length - 1)] || arr[0];
export const randomDateTime = () => {
  const year = randomIntFromInterval(2020, 2022);

  const numAsStr = (v: number) => v < 10 ? `0${v}`: `${v}`;

  const month = numAsStr(randomIntFromInterval(1, 12));
  const day = numAsStr(randomIntFromInterval(1, 31));
  const h = numAsStr(randomIntFromInterval(0, 23));
  const m = numAsStr(randomIntFromInterval(0, 59));
  const s = numAsStr(randomIntFromInterval(0, 59));

  return `${year}-${month}-${day}T${h}:${m}:${s}`;
}
