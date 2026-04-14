import { formatPrice } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats a whole number with 2 decimals", () => {
    const result = formatPrice(15);
    expect(result).toContain("15");
    expect(result).toMatch(/15[.,]00/);
  });

  it("formats zero correctly", () => {
    const result = formatPrice(0);
    expect(result).toMatch(/0[.,]00/);
  });

  it("formats decimal amounts", () => {
    const result = formatPrice(25.5);
    expect(result).toMatch(/25[.,]50/);
  });

  it("formats large numbers", () => {
    const result = formatPrice(1000);
    expect(result).toContain("1");
    expect(result).toContain("000");
  });

  it("includes currency symbol for USD", () => {
    const result = formatPrice(50, "USD");
    expect(result).toContain("$");
  });

  it("handles COP currency", () => {
    const result = formatPrice(50000, "COP");
    expect(result).toContain("50");
  });

  it("formats negative amounts", () => {
    const result = formatPrice(-10);
    expect(result).toContain("10");
  });
});
