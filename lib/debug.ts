export const log = (str: string, val: any) => {
  try {
    console.log(str, val);
  } catch (e) {}
  return val;
};
