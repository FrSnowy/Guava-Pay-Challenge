import getStrDateMS from "../get-str-date-ms";

describe("ISO string date to local time ms", () => {
  test("Should handle correct dates", () => {
    const date = new Date();
    const isoStringDate = date.toISOString();

    expect(
      new Date(
        getStrDateMS(isoStringDate) + date.getTimezoneOffset() * 60000
      ).toISOString()
    ).toStrictEqual(isoStringDate);
  })

  test("Should handle incorrect dates", () => {
    expect(getStrDateMS("")).toStrictEqual(-1);
  })
})