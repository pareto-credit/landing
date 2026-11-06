// @vitest-environment node
import { afterEach, describe, expect, it } from "vitest";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  generatePageDocuments,
  renderPageDocument,
} from "./generate-page-documents.js";
import { pageHead, type MetadataPath } from "../src/lib/pageHead";
import metadata from "../src/data/pageMetadata.json";

const dirs: string[] = [];
const template =
  '<!doctype html><html><head><!-- route-head:start --><!-- route-head:end --><script id="analytics"></script></head><body><div id="root"></div><script src="/assets/app.js" type="module"></script></body></html>';
afterEach(() => {
  for (const dir of dirs.splice(0))
    rmSync(dir, { recursive: true, force: true });
});

describe("route-specific static entry documents", () => {
  it("writes actual directory entries for public routes while retaining the Vite application", () => {
    const distDir = mkdtempSync(join(tmpdir(), "pareto-static-routes-"));
    dirs.push(distDir);
    writeFileSync(join(distDir, "index.html"), template);
    const files = generatePageDocuments({ distDir });
    expect(files).toHaveLength(Object.keys(metadata.pages).length);
    for (const path of ["originators", "capital-providers"]) {
      const html = readFileSync(join(distDir, path, "index.html"), "utf8");
      expect(html).toContain(
        `<link data-static-route-head rel="canonical" href="https://pareto.credit/${path}/"`
      );
      expect(html).toContain('src="/assets/app.js"');
      expect(html).toContain('id="analytics"');
    }
    expect(existsSync(join(distDir, "404.html"))).toBe(true);
    const fallback = readFileSync(join(distDir, "404.html"), "utf8");
    expect(fallback).toContain('name="robots" content="noindex"');
    expect(fallback).not.toContain('rel="canonical"');
  });

  it.each(Object.keys(metadata.pages) as MetadataPath[])(
    "keeps %s initial head values in parity with TanStack route metadata",
    (path) => {
      const html = renderPageDocument(template, path);
      const head = pageHead(path);
      for (const tag of head.meta) {
        const escape = (s: string) =>
          s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        if (tag.title)
          expect(html).toContain(
            `<title data-static-route-head>${escape(tag.title)}</title>`
          );
        else expect(html).toContain(`content="${escape(tag.content!)}"`);
      }
      expect(html).toContain(`href="${head.links[0].href}"`);
      expect(renderPageDocument(html, path)).toBe(html);
    }
  );

  it("fails the build when metadata placeholders are missing", () => {
    expect(() =>
      renderPageDocument("<html><head></head></html>", "/originators")
    ).toThrow("placeholder");
  });
});
