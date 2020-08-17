const uncurry = (fn: Function) => (...args: any[]) => args.reduce((fn, arg) => fn(arg), fn);

export default uncurry;
