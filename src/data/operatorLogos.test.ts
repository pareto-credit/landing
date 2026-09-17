import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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

  it("resolves the TwoPrime background used by the vault card", () => {
    expect(getOperatorBackground("TWO_PRIME", "Two Prime")).toBeTruthy();
  });

  it("keeps the TwoPrime watermark flush with the card's right edge", () => {
    const background = readFileSync(
      resolve(process.cwd(), "src/assets/images/operators/twoprimeBg.svg"),
      "utf8",
    );

    expect(background).toContain('viewBox="77 205 708 590"');
  });

  it("resolves the Northbridge API operator code used as a vault curator", () => {
    expect(getOperatorLogo("NORTHBRIDGE", "Northbridge")).toBeTruthy();
  });
});
