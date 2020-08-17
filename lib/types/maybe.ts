import { curry } from "../..";

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

export const just = <V>(value: V): Just<V> => ({
  _tag: "Just",
  value,
});

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

/**
 * Same as map but map takes one variant of the type and returns the same variant,
 * eg: map(id)(just(1)) always return a just
 * andThen can transform a just into a nothing
 */
const uncurriedAndThen = <V, W>(fn: (just: V) => Maybe<W>, maybe: Maybe<V>): Maybe<W> => {
  if (isJust(maybe)) {
    return fn(maybe.value);
  } else {
    return maybe;
  }
};

export const andThen = curry(uncurriedAndThen);
