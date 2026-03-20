import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("radius tokens", () => {
  it("uses slightly tighter shared panel and card radii", () => {
    const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

    expect(css).toContain("--radius-3xl: 1rem;");
    expect(css).toContain("--radius-4xl: 1.375rem;");
    expect(css).toContain("--radius-panel: var(--radius-3xl);");
    expect(css).toContain("--radius-card: var(--radius-4xl);");
  });
});
