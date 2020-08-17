/**
 * RemoteData type encapsulates a remote data
 * By having the data and its state bound the developer have no choice but handle the
 * data state correctly. It also helps with loading state.
 * Imagine you have 2 async data
 * in a component `const state{users: [], organisations: [], loadingUser: false, loadingOrganisations: false}`,
 * it can become
 * ```javascript
 const state: {
    users: RemoteData<string, UserData>;
    organisations: RemoteData<string, OrganisationData>;
  } = { users: remoteInitial, organisations: remoteInitial };
 ```
 * (if more than one per component)
 */
import { curry } from "../..";

export type Initial = {
  readonly _tag: "Initial";
};

export type Pending = {
  readonly _tag: "Pending";
};

export type Failure<E> = {
  readonly _tag: "Failure";
  readonly error: E;
};

export type Success<A> = {
  readonly _tag: "Success";
  readonly value: A;
};

export type RemoteData<E, A> = Initial | Pending | Failure<E> | Success<A>;

// CONSTRUCTORS

export const initial: RemoteData<never, never> = {
  _tag: "Initial",
};

export const pending: RemoteData<never, never> = {
  _tag: "Pending",
};

export const failure = <E>(error: E): RemoteData<E, never> => ({
  _tag: "Failure",
  error,
});

export const success = <A>(value: A): RemoteData<never, A> => ({
  _tag: "Success",
  value,
});

// CHECKERS

export const isInitial = (remoteData: RemoteData<unknown, unknown>): remoteData is Initial =>
  remoteData._tag === "Initial";

export const isPending = (remoteData: RemoteData<unknown, unknown>): remoteData is Pending =>
  remoteData._tag === "Pending";

export const isFailure = <E>(remoteData: RemoteData<E, unknown>): remoteData is Failure<E> =>
  remoteData._tag === "Failure";

export const isSuccess = <A>(remoteData: RemoteData<unknown, A>): remoteData is Success<A> =>
  remoteData._tag === "Success";

// MAPPERS

export const uncurriedMap = <E, V, W>(fn: (arg: V) => W, remoteData: RemoteData<E, V>): RemoteData<E, W> => {
  if (isSuccess(remoteData)) {
    return success(fn(remoteData.value));
  }
  return remoteData;
};

export const map = curry(uncurriedMap);

export const uncurriedMapFailed = <E, F, V>(fn: (arg: E) => F, remoteData: RemoteData<E, V>): RemoteData<F, V> => {
  if (isFailure(remoteData)) {
    return failure(fn(remoteData.error));
  }
  return remoteData;
};

export const mapFailed = curry(uncurriedMapFailed);

export const uncurriedAndThen = <E, V, W>(
  fn: (arg: V) => RemoteData<E, W>,
  remoteData: RemoteData<E, V>
): RemoteData<E, W> => {
  if (isSuccess(remoteData)) {
    return fn(remoteData.value);
  }
  return remoteData;
};

export const andThen = curry(uncurriedAndThen);
