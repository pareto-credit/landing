import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("radius tokens", () => {
  it("uses the Live Vaults 6px radius for shared rectangular UI surfaces", () => {
    const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

    expect(css).toContain("--radius-md: 0.375rem;");
    expect(css).toContain("--radius-control: var(--radius-md);");
    expect(css).toContain("--radius-panel: var(--radius-md);");
    expect(css).toContain("--radius-card: var(--radius-md);");
  });
});
