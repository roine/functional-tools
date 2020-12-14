import { compose, Maybe } from "../..";

describe("maybe", () => {
  describe("Functor", () => {
    it("maps", () => {
      expect(Maybe.map(v => v + 1, Maybe.just(6))).toEqual(Maybe.just(7));
      expect(Maybe.map(v => v + 1, Maybe.nothing)).toEqual(Maybe.nothing);
    });
    it("preserves identity morphism", () => {
      expect(Maybe.map(v => v, Maybe.nothing)).toEqual(Maybe.nothing);
      expect(Maybe.map(v => v, Maybe.just(1))).toEqual(Maybe.just(1));
    });
    it("preserves composition of morphism", () => {
      expect(
        Maybe.map(
          compose(
            v => v + 1,
            v => v * 10
          )
        )(Maybe.just(2))
      ).toEqual(
        compose(
          Maybe.map(v => v + 1),
          Maybe.map(v => v * 10)
        )(Maybe.just(2))
      );
    });
  });

  describe("Monad", () => {});

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

  describe("flatMap", () => {
    const transformer = x => (x > 10 ? Maybe.nothing : Maybe.just(x));
    it("unwraps the value and let user wrap back", () => {
      expect(Maybe.flatMap(transformer, Maybe.just(1))).toEqual(Maybe.just(1));
      expect(Maybe.flatMap(transformer, Maybe.just(100))).toEqual(Maybe.nothing);
      expect(Maybe.flatMap(transformer, Maybe.nothing)).toEqual(Maybe.nothing);
    });
    it("is curried", () => {
      expect(Maybe.flatMap(transformer)(Maybe.just(1))).toEqual(Maybe.just(1));
    });

    it("can be composed", () => {
      const add10 = x => x + 10;
      expect(compose(Maybe.flatMap(transformer), Maybe.map(add10))(Maybe.just(1))).toEqual(Maybe.nothing);
    });
  });
});
