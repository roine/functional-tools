const Initial = Symbol();
const Pending = Symbol();
const Failure = Symbol();
const Success = Symbol();

export namespace RemoteData {
  export type Initial = {
    readonly _tag: typeof Initial;
  };

  export type Pending = {
    readonly _tag: typeof Pending;
  };

  export type Failure<E> = {
    readonly _tag: typeof Failure;
    readonly error: E;
  };

  export type Success<A> = {
    readonly _tag: typeof Success;
    readonly value: A;
  };

  export type Model<E, A> = Initial | Pending | Failure<E> | Success<A>;

  // CONSTRUCTORS

  export const initial: Model<never, never> = {
    _tag: Initial,
  };

  export const pending: Model<never, never> = {
    _tag: Pending,
  };

  export const failure = <E>(error: E): Model<E, never> => ({
    _tag: Failure,
    error,
  });

  export const success = <A>(value: A): Model<never, A> => ({
    _tag: Success,
    value,
  });

  // GETTERS

  export const fromSuccess = <A>(remoteData: Model<unknown, A>): A => {
    if (isSuccess(remoteData)) {
      return remoteData.value;
    }
    throw new Error("RemoteData.fromSuccess: not a success");
  };

  export const fromFailure = <E>(remoteData: Model<E, unknown>): E => {
    if (isFailure(remoteData)) {
      return remoteData.error;
    }
    throw new Error("RemoteData.fromFailure: not a failure");
  };

  // CHECKERS

  export const isInitial = (
      remoteData: Model<unknown, unknown>,
  ): remoteData is Initial => remoteData._tag === Initial;

  export const isPending = (
      remoteData: Model<unknown, unknown>,
  ): remoteData is Pending => remoteData._tag === Pending;

  export const isFailure = <E>(
      remoteData: Model<E, unknown>,
  ): remoteData is Failure<E> => remoteData._tag === Failure;

  export const isSuccess = <A>(
      remoteData: Model<unknown, A>,
  ): remoteData is Success<A> => remoteData._tag === Success;

  // MAPPERS

  export const map = <E, V, W>(
      fn: (arg: V) => W,
      remoteData: Model<E, V>,
  ): Model<E, W> => {
    if (isSuccess(remoteData)) {
      return success(fn(remoteData.value));
    }
    return remoteData;
  };

  export const mapFailed = <E, F, V>(
      fn: (arg: E) => F,
      remoteData: Model<E, V>,
  ): Model<F, V> => {
    if (isFailure(remoteData)) {
      return failure(fn(remoteData.error));
    }
    return remoteData;
  };

  export const andThen = <E, V, W>(
      fn: (arg: V) => Model<E, W>,
      remoteData: Model<E, V>,
  ): Model<E, W> => {
    if (isSuccess(remoteData)) {
      return fn(remoteData.value);
    }
    return remoteData;
  };
}
