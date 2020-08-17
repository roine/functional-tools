import { compose, Maybe } from "../..";

describe("maybe", () => {
  describe("map", () => {
    it("maps the Maybe value", () => {
      expect(Maybe.map(v => v + 1, Maybe.just(6))).toEqual(Maybe.just(7));
      expect(Maybe.map(v => v + 1, Maybe.nothing)).toEqual(Maybe.nothing);
    });
    it("is curried", () => {
      expect(Maybe.map(v => v + 1)(Maybe.just(6))).toEqual(Maybe.just(7));
    });
    it("can be composed", () => {
      expect(
        compose(
          Maybe.map(v => v + 1),
          Maybe.map(c => c - 2)
        )(Maybe.just(6))
      ).toEqual(Maybe.just(5));

      expect(
        compose(
          Maybe.map(v => v + 1),
          Maybe.map(c => c - 2)
        )(Maybe.nothing)
      ).toEqual(Maybe.nothing);
    });
  });

  describe("withDefault", () => {
    it("returns the maybe value with default if nothing", () => {
      expect(Maybe.withDefault(1, Maybe.just(2))).toBe(2);
      expect(Maybe.withDefault(1, Maybe.nothing)).toBe(1);
    });

    it("is curried", () => {
      expect(Maybe.withDefault(1)(Maybe.just(2))).toBe(2);
    });

    it("can be composed", () => {
      expect(
        compose(
          Maybe.withDefault(4),
          Maybe.map(v => v + 1),
          Maybe.map(c => c - 2)
        )(Maybe.just(6))
      ).toBe(5);
      expect(
        compose(
          Maybe.withDefault(4),
          Maybe.map(v => v + 1),
          Maybe.map(c => c - 2)
        )(Maybe.nothing)
      ).toBe(4);
    });
  });

  describe("andThen", () => {
    const transformer = x => (x > 10 ? Maybe.nothing : Maybe.just(x));
    it("unwraps the value and let user wrap back", () => {
      expect(Maybe.andThen(transformer, Maybe.just(1))).toEqual(Maybe.just(1));
      expect(Maybe.andThen(transformer, Maybe.just(100))).toEqual(Maybe.nothing);
      expect(Maybe.andThen(transformer, Maybe.nothing)).toEqual(Maybe.nothing);
    });
    it("is curried", () => {
      expect(Maybe.andThen(transformer)(Maybe.just(1))).toEqual(Maybe.just(1));
    });

    it("can be composed", () => {
      const add10 = x => x + 10;
      expect(compose(Maybe.andThen(transformer), Maybe.map(add10))(Maybe.just(1))).toEqual(Maybe.nothing);
    });
  });
});
