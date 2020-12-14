export const compose = <A, B>(...fns: ((arg: A) => B)[]) => (arg: A): B => {
  return fns.reduceRight((acc: any, fn: any) => fn(acc), arg);
};
