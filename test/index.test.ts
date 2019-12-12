import { numeric, tuples, numbers, strings, Cmp } from "../src";
import { expect } from "chai";

describe("numeric", () => {
  it("compares numbers with numbers", () => {
    expect(numeric(2, 2)).to.equal(0);
    expect(numeric(-2, 2)).to.equal(-1);
    expect(numeric(2, -2)).to.equal(1);
  });

  it("compares bigints with bigints", () => {
    expect(numeric(2n, 2n)).to.equal(0);
    expect(numeric(-2n, 2n)).to.equal(-1);
    expect(numeric(2n, -2n)).to.equal(1);
  });

  it("compares numbers with bigints", () => {
    expect(numeric(2, 2n)).to.equal(0);
    expect(numeric(2n, 2)).to.equal(0);
    expect(numeric(-2, 2n)).to.equal(-1);
    expect(numeric(-2n, 2)).to.equal(-1);
    expect(numeric(2, -2n)).to.equal(1);
    expect(numeric(2n, -2)).to.equal(1);
  });

  it("considers NaN equal to NaN", () => {
    expect(numeric(NaN, NaN)).to.equal(0);
  });

  it("considers NaN smaller than anything else", () => {
    expect(numeric(NaN, 0)).to.equal(-1);
    expect(numeric(0, NaN)).to.equal(1);
    expect(numeric(NaN, -Infinity)).to.equal(-1);
    expect(numeric(-Infinity, NaN)).to.equal(1);
  });

  it("considers -Infinity equal to -Infinity", () => {
    expect(numeric(-Infinity, -Infinity)).to.equal(0);
  });

  it("considers -Infinity smaller than any non-NaN", () => {
    const big = BigInt(Number.MAX_VALUE) ** 2n;
    expect(numeric(-Infinity, -big)).to.equal(-1);
  });

  it("considers Infinity equal to Infinity", () => {
    expect(numeric(-Infinity, -Infinity)).to.equal(0);
  });

  it("considers -Infinity larger than anything", () => {
    const big = BigInt(Number.MAX_VALUE) ** 2n;
    expect(numeric(big, Infinity)).to.equal(-1);
    expect(numeric(Infinity, big)).to.equal(1);
  });

  it("considers +0 equal to -0", () => {
    expect(numeric(+0, -0)).to.equal(0);
  });
});

describe("tuples", () => {
  it("zero-length tuples are always equal", () => {
    const t = tuples([]);
    expect(t([], [])).to.equal(0);
  });

  it("compares tuples with length 1-8", () => {
    const t1 = tuples([numbers]);
    expect(t1([1], [1])).to.equal(0);
    expect(t1([1], [2])).to.equal(-1);
    expect(t1([2], [1])).to.equal(1);

    const t2 = tuples([numbers, numbers]);
    expect(t2([0, 1], [0, 1])).to.equal(0);
    expect(t2([0, 1], [0, 2])).to.equal(-1);
    expect(t2([0, 2], [0, 1])).to.equal(1);

    const t3 = tuples([numbers, numbers, numbers]);
    expect(t3([0, 0, 1], [0, 0, 1])).to.equal(0);
    expect(t3([0, 0, 1], [0, 0, 2])).to.equal(-1);
    expect(t3([0, 0, 2], [0, 0, 1])).to.equal(1);

    const t4 = tuples([numbers, numbers, numbers, numbers]);
    expect(t4([0, 0, 0, 1], [0, 0, 0, 1])).to.equal(0);
    expect(t4([0, 0, 0, 1], [0, 0, 0, 2])).to.equal(-1);
    expect(t4([0, 0, 0, 2], [0, 0, 0, 1])).to.equal(1);

    const t5 = tuples([numbers, numbers, numbers, numbers, numbers]);
    expect(t5([0, 0, 0, 0, 1], [0, 0, 0, 0, 1])).to.equal(0);
    expect(t5([0, 0, 0, 0, 1], [0, 0, 0, 0, 2])).to.equal(-1);
    expect(t5([0, 0, 0, 0, 2], [0, 0, 0, 0, 1])).to.equal(1);

    const t6 = tuples([numbers, numbers, numbers, numbers, numbers, numbers]);
    expect(t6([0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1])).to.equal(0);
    expect(t6([0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 2])).to.equal(-1);
    expect(t6([0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 1])).to.equal(1);

    const t7 = tuples([
      numbers,
      numbers,
      numbers,
      numbers,
      numbers,
      numbers,
      numbers
    ]);
    expect(t7([0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1])).to.equal(0);
    expect(t7([0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 2])).to.equal(-1);
    expect(t7([0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 1])).to.equal(1);

    const t8 = tuples([
      numbers,
      numbers,
      numbers,
      numbers,
      numbers,
      numbers,
      numbers,
      numbers
    ]);
    expect(t8([0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 1])).to.equal(0);
    expect(t8([0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 2])).to.equal(-1);
    expect(t8([0, 0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 1])).to.equal(1);
  });

  it("support typed tuples with the length of 0-8", () => {
    const t0: Cmp<[]> = tuples([]);
    const t1: Cmp<[string]> = tuples([strings]);
    const t2: Cmp<[string, number]> = tuples([strings, numbers]);
    const t3: Cmp<[string, number, string]> = tuples([
      strings,
      numbers,
      strings
    ]);
    const t4: Cmp<[string, number, string, number]> = tuples([
      strings,
      numbers,
      strings,
      numbers
    ]);
    const t5: Cmp<[string, number, string, number, string]> = tuples([
      strings,
      numbers,
      strings,
      numbers,
      strings
    ]);
    const t6: Cmp<[string, number, string, number, string, number]> = tuples([
      strings,
      numbers,
      strings,
      numbers,
      strings,
      numbers
    ]);
    const t7: Cmp<[
      string,
      number,
      string,
      number,
      string,
      number,
      string
    ]> = tuples([
      strings,
      numbers,
      strings,
      numbers,
      strings,
      numbers,
      strings
    ]);
    const t8: Cmp<[
      string,
      number,
      string,
      number,
      string,
      number,
      string,
      number
    ]> = tuples([
      strings,
      numbers,
      strings,
      numbers,
      strings,
      numbers,
      strings,
      numbers
    ]);
  });
});
