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
});
