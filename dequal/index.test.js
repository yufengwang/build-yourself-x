// const { deepEqual } = require("./index");
// const { deepEqual } = require("./index");
const { isEqual :deepEqual } = require("./old");


function same(a, b) {
  expect(deepEqual(a, b)).toBe(true);
}

function different(a, b) {
  expect(deepEqual(a, b)).toBe(false);
}

describe("test deepEqual", () => {
  test("scalars", () => {
    same(1, 1);
    different(1, 2);

    different(1, []);
    different(1, "1");
    same(Infinity, Infinity);
    different(Infinity, -Infinity);
    different(NaN, undefined);
    different(NaN, null);
    same(NaN, NaN);
    different(1, -1);
    same(0, -0);

    same(null, null);
    same(void 0, undefined);
    same(undefined, undefined);
    different(null, undefined);
    different("", null);
    different(0, null);

    same(true, true);
    same(false, false);
    different(true, false);
    different(0, false);
    different(1, true);

    same("a", "a");
    different("a", "b");
  });

  test("objects", () => {
    same({}, {});
    same({ a: 1, b: 2 }, { a: 1, b: 2 });
    same({ b: 2, a: 1 }, { a: 1, b: 2 });

    different({ a: 1, b: 2, c: [] }, { a: 1, b: 2 });
    different({ a: 1, b: 2 }, { a: 1, b: 2, c: [] });
    different({ a: 1, c: 3 }, { a: 1, b: 2 });

    same({ a: [{ b: 1 }] }, { a: [{ b: 1 }] });
    different({ a: [{ b: 2 }] }, { a: [{ b: 1 }] });
    different({ a: [{ c: 1 }] }, { a: [{ b: 1 }] });

    different([], {});
    different({}, []);
    different({}, null);
    different({}, undefined);

    different({ a: void 0 }, {});
    different({}, { a: undefined });
    different({ a: undefined }, { b: undefined });
  });

  test("dictionary", () => {
    const foo = Object.create(null);
    const bar = Object.create(null);
    same(foo, bar);

    foo.hello = "world";
    different(foo, bar);
  });

  test("Arrays", () => {
    same([], []);
    same([1, 2, 3], [1, 2, 3]);
    different([1, 2, 4], [1, 2, 3]);
    different([1, 2], [1, 2, 3]);

    same([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }]);
    different([{ a: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }]);

    different({ 0: 0, 1: 1, length: 2 }, [0, 1]);
  });

  // test("Dates", () => {
  //   same(
  //     new Date("2015-05-01T22:16:18.234Z"),
  //     new Date("2015-05-01T22:16:18.234Z")
  //   );

  //   different(
  //     new Date("2015-05-01T22:16:18.234Z"),
  //     new Date("2017-01-01T00:00:00.000Z")
  //   );

  //   different(new Date("2015-05-01T22:16:18.234Z"), "2015-05-01T22:16:18.234Z");

  //   different(new Date("2015-05-01T22:16:18.234Z"), 1430518578234);

  //   different(new Date("2015-05-01T22:16:18.234Z"), {});
  // });

  // test("RegExp", () => {
  //   same(/foo/, /foo/);
  //   same(/foo/i, /foo/i);

  //   different(/foo/, /bar/);
  //   different(/foo/, /foo/i);

  //   different(/foo/, "foo");
  //   different(/foo/, {});
  // });

  // test("Functions", () => {
  //   let foo = () => {};
  //   let bar = () => {};

  //   same(foo, foo);
  //   different(foo, bar);
  //   different(foo, () => {});
  // });
});
