const compose = (...fns: Function[]) => (arg: string | number | boolean | symbol | object): any => {
  return fns.reduceRight((acc: any, fn: any) => {
    if (acc === undefined) {
      return fn(arg);
    } else {
      return fn(acc);
    }
  }, undefined);
};

export default compose;
