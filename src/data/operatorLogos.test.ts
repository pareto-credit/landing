import { describe, expect, it } from "vitest";
import { getOperatorBackground, getOperatorLogo } from "./operatorLogos";

describe("operator logo resolution", () => {
  it("resolves the M1 Capital operator code used by the app API", () => {
    expect(getOperatorLogo("m1capital", "M1 Capital")).toBeTruthy();
  });

  it("resolves the M1 Capital background mark used by vault cards", () => {
    expect(getOperatorBackground("m1capital", "M1 Capital")).toBeTruthy();
  });

  it("resolves the TwoPrime API operator code used by the carousel", () => {
    expect(getOperatorLogo("TWO_PRIME", "Two Prime")).toBeTruthy();
  });

  it("resolves the Northbridge API operator code used as a vault curator", () => {
    expect(getOperatorLogo("NORTHBRIDGE", "Northbridge")).toBeTruthy();
  });
});
