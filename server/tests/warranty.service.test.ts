
import { describe, expect, it } from "vitest";
import { getWarrantyStatus } from "../src/services/warranty.service.js";

describe("getWarrantyStatus", () => {
  const today = new Date(2026, 10, 8);

  it("returns VALID when more than 30 days remain", () => {
    const expiry = new Date(2026, 11, 10);

    expect(getWarrantyStatus(expiry, today)).toBe("VALID");
  });

  it("returns EXPIRING_SOON when exactly 30 days remain", () => {
    const expiry = new Date(2026, 11, 8);

    expect(getWarrantyStatus(expiry, today)).toBe("EXPIRING_SOON");
  });

  it("returns EXPIRED when the expiry date has passed", () => {
    const expiry = new Date(2026, 10, 7);

    expect(getWarrantyStatus(expiry, today)).toBe("EXPIRED");
  });

  it("returns NOT_RECORDED when no expiry date exists", () => {
    expect(getWarrantyStatus(null, today)).toBe("NOT_RECORDED");
  });
});
