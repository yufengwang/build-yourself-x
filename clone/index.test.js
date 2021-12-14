const { deepClone } = require("./index");

describe("test deepClone", () => {
  test("deepclone a simple object", () => {
    const obj = { a: { a: 1 } };
    expect(deepClone(obj)).toEqual({ a: { a: 1 } });
  });
});
