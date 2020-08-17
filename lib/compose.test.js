const { compose } = require("..");

describe("compose", () => {
  it("composes", () => {
    const add1 = a => a + 1;
    const add2 = a => a + 2;
    const add3 = a => a + 3;
    const id = x => x;
    expect(compose(add1, add2, add3)(0)).toBe(6);
    expect(compose(compose(add1), add2, add3)(0)).toBe(6);
    expect(compose(compose(add1, add2), add3)(0)).toBe(6);
    expect(compose(compose(compose(add1), add2, add3))(0)).toBe(6);
    expect(compose(id)(5)).toBe(5);
  });
});
