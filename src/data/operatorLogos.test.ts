import { describe, expect, it } from "vitest";
import { getOperatorBackground, getOperatorLogo } from "./operatorLogos";

describe("operator logo resolution", () => {
  it("resolves the M1 Capital operator code used by the app API", () => {
    expect(getOperatorLogo("m1capital", "M1 Capital")).toBeTruthy();
  });

  it("resolves the M1 Capital background mark used by vault cards", () => {
    expect(getOperatorBackground("m1capital", "M1 Capital")).toBeTruthy();
  });
});
