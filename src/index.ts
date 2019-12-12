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
    // than any other number, just to keep comparisons transitive.
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

type T0 = [];
type T1 = [any];
type T2 = [any, any];
type T3 = [any, any, any];
type T4 = [any, any, any, any];
type T5 = [any, any, any, any, any];
type T6 = [any, any, any, any, any, any];
type T7 = [any, any, any, any, any, any, any];
type T8 = [any, any, any, any, any, any, any, any];

type Mapped<T extends any[]> = {
  [K in keyof T]: Cmp<T[K]>;
};

export function tuples<T extends T0>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T1>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T2>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T3>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T4>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T5>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T6>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T7>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends T8>(items: Mapped<T>): Cmp<T>;
export function tuples<T extends unknown[]>(items: Mapped<T>): Cmp<T> {
  return (a, b) => {
    let result: CmpResult = 0;
    for (let i = 0; !result && i < items.length; i++) {
      result = items[i](a[i], b[i]);
    }
    return result;
  };
}
