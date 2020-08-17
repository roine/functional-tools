const { curry } = require("..");

const add = (a, b, c) => a + b + c;

describe("curry", () => {
  it("curries", () => {
    const curriedAdd = curry(add);
    expect(curriedAdd(1, 2, 3)).toBe(6);
    expect(curriedAdd(1)(2)(3)).toBe(6);
    expect(curriedAdd(1, 2)(3)).toBe(6);
    expect(curriedAdd(1)(2, 3)).toBe(6);
    expect(curriedAdd(1)(2, 3, 4)).toBe(6);
  });
});
