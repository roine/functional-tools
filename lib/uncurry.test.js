const fc = require("fast-check");
const { curry, uncurry } = require("..");

const add = (a, b, c) => a + b + c;

describe("uncurry", () => {
  it("uncurries as function", () => {
    expect(uncurry(curry(add))(1, 2, 3)).toBe(add(1, 2, 3));
  });

  it("works with 100 random values", () => {
    fc.assert(
      fc.property(fc.nat(), fc.nat(), fc.nat(), (a, b, c) => {
        expect(uncurry(curry(add))(a, b, c)).toBe(add(a, b, c));
      })
    );
  });
});
