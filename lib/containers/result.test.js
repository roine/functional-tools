import { Result, compose } from "../..";

describe("result", () => {
  describe("map", () => {
    it("maps ResultOk value", () => {
      expect(Result.map(x => x + 1, Result.ok(1))).toEqual(Result.ok(2));
      expect(Result.map(x => x + 1, Result.err("string isn't a date"))).toEqual(Result.err("string isn't a date"));
    });
    it("is curried", () => {
      expect(Result.map(v => v + 1)(Result.ok(1))).toEqual(Result.ok(2));
    });
    it("can be composed", () => {
      expect(
        compose(
          Result.map(v => v + 1),
          Result.map(c => c - 2)
        )(Result.ok(6))
      ).toEqual(Result.ok(5));

      expect(compose(Result.map(v => v + 1))(Result.err("name is not valid"))).toEqual(Result.err("name is not valid"));
    });
  });

  describe("combine", () => {
    it("combine a list of result to a result of list value", () => {
      expect(Result.combine([Result.ok("1"), Result.ok("2")])).toEqual(Result.ok(["1", "2"]));
    });

    it("returns the first error found if any", () => {
      expect(Result.combine([Result.ok("1"), Result.err("error"), Result.ok("2")])).toEqual(Result.err("error"));
      expect(Result.combine([Result.ok("1"), Result.err("error"), Result.ok("2"), Result.err("error1")])).toEqual(
        Result.err("error")
      );
    });
  });
});
