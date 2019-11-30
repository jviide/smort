import { numeric } from "../src";
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
