import { curry } from "../curry";

/**
 * Maybe type encapsulates an optional value
 * A value of type Maybe a either contains a value of type a
 * (represented as Just a), or it is empty (represented as Nothing)
 */

export type Nothing = {
  readonly _tag: "Nothing";
};

export type Just<V> = {
  readonly _tag: "Just";
  readonly value: V;
};

export type Maybe<V> = Just<V> | Nothing;

export const nothing: Nothing = { _tag: "Nothing" };

export const just = <V>(value: V): Maybe<V> => {
  if (value === null) {
    return nothing;
  }
  return {
    _tag: "Just",
    value,
  };
};

export const isNothing = <V>(maybe: Maybe<V>): maybe is Nothing => maybe._tag === "Nothing";

export const isJust = <V>(maybe: Maybe<V>): maybe is Just<V> => maybe._tag === "Just";

/**
 * const val = Maybe.nothing
 * Maybe.withDefault("tree", val)
 * // "tree
 *
 * const val = Maybe.just("leaf")
 * Maybe.withDefault("tree", val)
 * // "leaf"
 */
const uncurriedWithDefault = <V>(defaultValue: V, maybe: Maybe<V>): V => {
  if (isJust(maybe)) {
    return maybe.value;
  } else {
    return defaultValue;
  }
};

export const withDefault = curry(uncurriedWithDefault);

/**
 * const val = Maybe.just(4)
 * Maybe.map((v) => v + 2, val) // Maybe.just(6)
 *
 *
 * const val = Maybe.nothing
 * Maybe.map((v) => v + 2, val) // Maybe.nothing
 *
 * it is also curried and can be composed
 * const val = Maybe.just(4)
 * compose(Maybe.map((v) => v + 2), Maybe.map((v) => v + 8))(0) // Maybe.just(10)
 *
 */
const uncurriedMap = <V, W>(fn: (just: V) => W, maybe: Maybe<V>): Maybe<W> => {
  if (isJust(maybe)) {
    return just(fn(maybe.value));
  } else {
    return maybe;
  }
};

export const map = curry(uncurriedMap);

const uncurriedMap2 = <V, W, X>(fn: (just: V, just2: W) => X, maybe: Maybe<V>, maybe2: Maybe<W>): Maybe<X> => {
  if (isNothing(maybe)) {
    return nothing;
  } else {
    if (isNothing(maybe2)) {
      return nothing;
    } else {
      return just(fn(maybe.value, maybe2.value));
    }
  }
};

export const map2 = curry(uncurriedMap2);

const uncurriedMap3 = <V, W, X, Y>(
  fn: (just: V, just2: W, just3: X) => Y,
  maybe: Maybe<V>,
  maybe2: Maybe<W>,
  maybe3: Maybe<X>
): Maybe<Y> => {
  if (isNothing(maybe)) {
    return nothing;
  } else if (isNothing(maybe2)) {
    return nothing;
  } else {
    if (isNothing(maybe3)) {
      return nothing;
    } else {
      return just(fn(maybe.value, maybe2.value, maybe3.value));
    }
  }
};

export const map3 = curry(uncurriedMap3);

const uncurriedFlatMap = <V, W>(fn: (just: V) => Maybe<W>, maybe: Maybe<V>): Maybe<W> => {
  if (isJust(maybe)) {
    return fn(maybe.value);
  } else {
    return maybe;
  }
};

export const flatMap = curry(uncurriedFlatMap);
