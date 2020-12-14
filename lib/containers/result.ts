import { curry } from "../..";

export type Ok<V> = { _tag: "ok"; value: V };

export type Err<E> = { _tag: "err"; error: E };

export type Result<E, V> = Ok<V> | Err<E>;

export const ok = <V>(value: V): Ok<V> => {
  return {
    _tag: "ok",
    value,
  };
};

export const err = <E>(error: E): Err<E> => ({
  _tag: "err",
  error,
});

export const isOk = <E, V>(result: Result<E, V>): result is Ok<V> => result._tag === "ok";

export const isErr = <E, V>(result: Result<E, V>): result is Err<E> => result._tag === "err";

// return the first Err if any, otherwise return a Result with a list of instruction
export const combine = <E, V>(result: Result<E, V>[]): Result<E, V[]> => {
  return result.reduce((acc: Result<E, V[]>, res: Result<E, V>) => {
    if (isErr(acc)) {
      return acc;
    } else if (isErr(res)) {
      return err(res.error);
    }
    return ok([...acc.value, res.value]);
  }, ok([]));
};

const uncurriedMap = <E, V, W>(fn: (value: V) => W, result: Result<E, V>): Result<E, W> => {
  if (isErr(result)) {
    return result;
  } else {
    return ok(fn(result.value));
  }
};

export const map = curry(uncurriedMap);

const uncurriedAndThen = <E, V, W>(fn: (ok: V) => Result<E, W>, result: Result<E, V>): Result<E, W> => {
  if (isOk(result)) {
    return fn(result.value);
  } else {
    return result;
  }
};

export const andThen = curry(uncurriedAndThen);
