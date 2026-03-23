import { describe, expect, it } from "vitest";
import { loadLegalDocument } from "./legalDocuments";

describe("loadLegalDocument", () => {
  it("returns the local terms of service content", () => {
    const document = loadLegalDocument("terms");

    expect(document.title).toBe("Terms of Service");
    expect(document.content).toContain("Terms of Service");
    expect(document.content).toContain("Introduction");
    expect(document.sourceUrl).toBe("https://idle.finance/terms-of-service");
  });

  it("returns the local privacy policy content", () => {
    const document = loadLegalDocument("privacy");

    expect(document.title).toBe("Privacy Policy");
    expect(document.content).toContain(
      "This Application collects some Personal Data from its Users.",
    );
    expect(document.content).toContain("Owner and Data Controller");
    expect(document.sourceUrl).toBe(
      "https://www.iubenda.com/privacy-policy/61211749",
    );
  });
});
