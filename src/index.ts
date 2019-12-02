export type CmpResult = -1 | 0 | 1;

export type Cmp<T> = (a: T, b: T) => CmpResult;

export const numeric = (a: number | bigint, b: number | bigint): CmpResult => {
  if (a == b) {
    // Use == instead of ===, because e.g. 2 !== BigInt(2) but 2 == BigInt(2).
    // In this case no implicit type casting should take place, as == compares
    // Numbers and BigInts by their "mathematical value" (see references).
    return 0;
  } else if (a < b) {
    // < also compares Numbers and BigInts by their mathematical value.
    return -1;
  } else if (a === a) {
    // Only NaN is not equal with itself, so a === a ensures that a is not a NaN
    // (use a === a instead of isNaN(a), because TypeScript forbids isNaN to take BigInts).
    // So at this point `a > b || isNaN(b)` must be true. Let's consider NaN smaller
    // than any other number, just to keep comparisons consistent.
    return 1;
  } else if (b === b) {
    // At this point `isNaN(a) && !isNaN(b)` must be true.
    return -1;
  } else {
    // Both a and b are NaN. Let's consider them equal.
    return 0;
  }
  // References:
  //  * https://tc39.es/ecma262/#sec-mathematical-operations 
  //    for the definition of "mathematical value"
  //  * https://tc39.es/ecma262/#sec-abstract-relational-comparison
  //    for the definition of the < operation.
  //  * https://tc39.es/ecma262/#sec-abstract-equality-comparison
  //    for the definition of the == operation.
  //  * https://tc39.es/ecma262/#sec-strict-equality-comparison
  //    for the definition of the === operation.
};
export const numbers = numeric as Cmp<number>;

const bigints = (a: bigint, b: bigint): CmpResult => {
  return a === b ? 0 : a < b ? -1 : 1;
};
export const strings = (bigints as unknown) as Cmp<string>;
export const booleans = (bigints as unknown) as Cmp<boolean>;

export const nulls = (_a: null, _b: null): CmpResult => 0;
export const undefineds = (nulls as unknown) as Cmp<undefined>;
