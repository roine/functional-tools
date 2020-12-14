export const curry = (fn: Function) => {
  const argl: number = fn.length;

  const curried = (...args: any[]): any => {
    if (args.length < argl) {
      // add the args to the next call arguments
      return curried.bind(null, ...args);
    } else {
      // ignore any parameter that exceeds the expected arity
      return fn(...args.slice(0, argl));
    }
  };
  return curried;
};
