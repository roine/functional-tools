import { compose, RemoteData } from "../..";

describe("remoteData", () => {
  describe("map", () => {
    it("maps the RemoteSuccess value", () => {
      expect(RemoteData.map(v => v + 1, RemoteData.success(6))).toEqual(RemoteData.success(7));
      expect(RemoteData.map(v => v + 1, RemoteData.initial)).toEqual(RemoteData.initial);
    });
    it("is curried", () => {
      expect(RemoteData.map(v => v + 1)(RemoteData.success(6))).toEqual(RemoteData.success(7));
    });
    it("can be composed", () => {
      expect(
        compose(
          RemoteData.map(v => v + 1),
          RemoteData.map(c => c - 2)
        )(RemoteData.success(6))
      ).toEqual(RemoteData.success(5));

      expect(compose(RemoteData.map(v => v + 1))(RemoteData.pending)).toEqual(RemoteData.pending);
    });
  });

  describe("andThen", () => {
    const transformer = x => (x > 10 ? RemoteData.failure : RemoteData.success(x));
    it("unwraps the value and let user wrap back", () => {
      expect(RemoteData.andThen(transformer, RemoteData.success(1))).toEqual(RemoteData.success(1));
      expect(RemoteData.andThen(transformer, RemoteData.success(100))).toEqual(RemoteData.failure);
      expect(RemoteData.andThen(transformer, RemoteData.failure)).toEqual(RemoteData.failure);
    });
    it("is curried", () => {
      expect(RemoteData.andThen(transformer)(RemoteData.success(1))).toEqual(RemoteData.success(1));
    });

    it("can be composed", () => {
      const add10 = x => x + 10;
      expect(compose(RemoteData.andThen(transformer), RemoteData.map(add10))(RemoteData.success(1))).toEqual(
        RemoteData.failure
      );
    });
  });
});
