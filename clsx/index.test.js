const { clsx, prefixClsx } = require("./index");

describe("test clsx()", () => {
  test("simple string", () => {
    expect(clsx("")).toEqual("");
    expect(clsx("foo")).toEqual("foo");
    expect(clsx(true && "foo")).toEqual("foo");
    expect(clsx(false && "foo")).toEqual("");
  });

  test("strings (variadic)", () => {
    expect(clsx("")).toEqual("");
    expect(clsx("foo", "bar")).toEqual("foo bar");
    expect(clsx(true && "foo", false && "bar", "baz")).toEqual("foo baz");
    expect(clsx(false && "foo", "bar", "baz", "")).toEqual("bar baz");
  });

  test("objects", () => {
    expect(clsx({ foo: true })).toEqual("foo");
    expect(clsx({ foo: true, bar: false })).toEqual("foo");
    expect(clsx({ foo: "hiya", bar: 1 })).toEqual("foo bar");
    expect(clsx({ foo: 1, bar: 0, baz: 1 })).toEqual("foo baz");
    expect(clsx({ "-foo": 1, "--bar": 1 })).toEqual("-foo --bar");
  });

  test("objects (variadic)", () => {
    expect(clsx({}, {})).toEqual("");
    expect(clsx({ foo: 1 }, { bar: 2 })).toEqual("foo bar");
    expect(clsx({ foo: 1 }, null, { baz: 1, bat: 0 })).toEqual("foo baz");
    expect(
      clsx({ foo: 1 }, {}, {}, { bar: "a" }, { baz: null, bat: Infinity })
    ).toEqual("foo bar bat");
  });

  test("arrays", () => {
    expect(clsx([])).toEqual("");
    expect(clsx(["foo"])).toEqual("foo");
    expect(clsx(["foo", "bar"])).toEqual("foo bar");
    expect(clsx(["foo", 0 && "bar", 1 && "baz"])).toEqual("foo baz");
  });

  test("arrays (nested)", () => {
    expect(clsx([[[]]])).toEqual("");
    expect(clsx([[["foo"]]])).toEqual("foo");
    expect(clsx([true, [["foo"]]])).toEqual("foo");
    expect(clsx(["foo", ["bar", ["", [["baz"]]]]])).toEqual("foo bar baz");
  });

  test("arrays (variadic)", () => {
    expect(clsx([], [])).toEqual("");
    expect(clsx(["foo"], ["bar"])).toEqual("foo bar");
    expect(clsx(["foo"], null, ["baz", ""], true, "", [])).toEqual("foo baz");
  });

  test("arrays (no `push` escape)", () => {
    expect(clsx({ push: 1 })).toEqual("push");
    expect(clsx({ pop: true })).toEqual("pop");
    expect(clsx({ push: true })).toEqual("push");
    expect(clsx("hello", { world: 1, push: true })).toEqual("hello world push");
  });

  test("functions", () => {
    const foo = () => {};
    expect(clsx(foo, "hello")).toEqual("hello");
    expect(clsx(foo, "hello", clsx)).toEqual("hello");
    expect(clsx(foo, "hello", [[clsx], "world"])).toEqual("hello world");
  });

  test("objects (variadic) prefix", () => {
    expect(prefixClsx("wm", {}, {})).toEqual("wm");
    expect(prefixClsx("wm", { foo: 1 }, { bar: 2 })).toEqual(
      "wm wm-foo wm-bar"
    );
    expect(prefixClsx("wm", { foo: 1 }, null, { baz: 1, bat: 0 })).toEqual(
      "wm wm-foo wm-baz"
    );
    expect(
      prefixClsx(
        "wm",
        { foo: 1 },
        {},
        {},
        { bar: "a" },
        { baz: null, bat: Infinity }
      )
    ).toEqual("wm wm-foo wm-bar wm-bat");
  });

  // expect(
  //   clsx({
  //     toString: function() {
  //       return "classFromMethod";
  //     },
  //   })
  // ).toEqual("classFromMethod");
  // var Class1 = function() {};
  // var Class2 = function() {};
  // Class1.prototype.toString = function() {
  //   return "classFromMethod";
  // };
  // Class2.prototype = Object.create(Class1.prototype);
  // expect(clsx(new Class2())).toEqual("classFromMethod");
});
