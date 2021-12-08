const qs = require("./index");
// const qs = require("qs");


describe("test parse()", () => {
  test("parses a simple string", () => {
    expect(qs.parse("0=foo")).toEqual({ 0: "foo" });
    expect(qs.parse("cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World")).toEqual({
      cht: "p3",
      chd: "t:60,40",
      chs: "250x100",
      chl: "Hello|World"
    });
    expect(qs.parse("foo=bar&baz")).toEqual({ foo: "bar", baz: "" });
    expect(qs.parse('foo=c++')).toEqual({ foo: 'c  ' })
  });
});
