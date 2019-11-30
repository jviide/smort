export type CmpResult = -1 | 0 | 1;

export type Cmp<T> = (a: T, b: T) => CmpResult;

export const numeric = (a: number | bigint, b: number | bigint): CmpResult => {
  if (a == b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else if (a === a) {
    // a > b || isNaN(b)
    return 1;
  } else if (b === b) {
    // isNaN(a)
    return -1;
  } else {
    return 0;
  }
};
export const numbers = numeric as Cmp<number>;

const bigints = (a: bigint, b: bigint): CmpResult => {
  return a === b ? 0 : a < b ? -1 : 1;
};
export const strings = (bigints as unknown) as Cmp<string>;
export const booleans = (bigints as unknown) as Cmp<boolean>;

export const nulls = (_a: null, _b: null): CmpResult => 0;
export const undefineds = (nulls as unknown) as Cmp<undefined>;
