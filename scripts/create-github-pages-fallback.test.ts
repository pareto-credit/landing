// @vitest-environment node

import { afterEach, describe, expect, it } from "vitest";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureGitHubPagesFallback } from "./create-github-pages-fallback.js";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe("ensureGitHubPagesFallback", () => {
  it("copies the built index document to a 404 fallback for GitHub Pages", () => {
    const distDir = mkdtempSync(join(tmpdir(), "gh-pages-fallback-"));
    const indexPath = join(distDir, "index.html");
    const fallbackPath = join(distDir, "404.html");
    const html = "<!doctype html><html><body>Pareto</body></html>";

    tempDirs.push(distDir);
    writeFileSync(indexPath, html, "utf8");

    ensureGitHubPagesFallback({ distDir });

    expect(existsSync(fallbackPath)).toBe(true);
    expect(readFileSync(fallbackPath, "utf8")).toBe(html);
  });
});
