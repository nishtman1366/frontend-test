import { describe, it, expect } from "vitest";
import { getPaginationRange, DOTS } from "./pagination";

describe("getPaginationRange", () => {
  it("returns full range when totalPages small", () => {
    expect(
      getPaginationRange({ currentPage: 1, totalPages: 5, siblingCount: 1 })
    ).toEqual([1, 2, 3, 4, 5]);
  });

  it("uses dots when pages are many", () => {
    const result = getPaginationRange({
      currentPage: 10,
      totalPages: 20,
      siblingCount: 1,
    });
    expect(result[0]).toBe(1);
    expect(result.includes(DOTS)).toBe(true);
    expect(result[result.length - 1]).toBe(20);
  });
});
