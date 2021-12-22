const { clsx: fn } = require("./index");

describe("test clsx()", () => {
  test("(compat) keeps object keys with truthy values", () => {
    const out = fn({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 });
    expect(out).toEqual("a f");
  });

  test("(compat) joins arrays of class names and ignore falsy values", () => {
    const out = fn("a", 0, null, undefined, true, 1, "b");
    expect(out).toEqual("a 1 b");
  });

  test("(compat) supports heterogenous arguments", () => {
    expect(fn({ a: true }, "b", 0)).toEqual("a b");
  });

  test("(compat) should be trimmed", () => {
    expect(fn("", "b", {}, "")).toEqual("b");
  });

  test("(compat) returns an empty string for an empty configuration", () => {
    expect(fn({})).toEqual("");
  });

  test("(compat) supports an array of class names", () => {
    expect(fn(["a", "b"])).toEqual("a b");
  });

  test("(compat) joins array arguments with string arguments", () => {
    expect(fn(["a", "b"], "c")).toEqual("a b c");
    expect(fn("c", ["a", "b"])).toEqual("c a b");
  });

  test("(compat) handles multiple array arguments", () => {
    expect(fn(["a", "b"], ["c", "d"])).toEqual("a b c d");
  });

  test("(compat) handles arrays that include falsy and true values", () => {
    expect(fn(["a", 0, null, undefined, false, true, "b"])).toEqual("a b");
  });

  test("(compat) handles arrays that include arrays", () => {
    expect(fn(["a", ["b", "c"]])).toEqual("a b c");
  });

  test("(compat) handles arrays that include objects", () => {
    expect(fn(["a", { b: true, c: false }])).toEqual("a b");
  });

  test("(compat) handles deep array recursion", () => {
    expect(fn(["a", ["b", ["c", { d: true }]]])).toEqual("a b c d");
  });

  test("(compat) handles arrays that are empty", () => {
    expect(fn("a", [])).toEqual("a");
  });

  test("(compat) handles nested arrays that have empty nested arrays", () => {
    expect(fn("a", [[]])).toEqual("a");
  });

  test("(compat) handles all types of truthy and falsy property values as expected", () => {
    const out = fn({
      // falsy:
      null: null,
      emptyString: "",
      noNumber: NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined: undefined,

      // truthy (literally anything else):
      nonEmptyString: "foobar",
      whitespace: " ",
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: { a: 1, b: 2 },
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1,
    });

    expect(out).toEqual(
      "nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero"
    );
  });
});
