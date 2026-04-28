// @vitest-environment node

import { afterEach, describe, expect, it } from "vitest";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { generateAgentDiscovery } from "./generate-agent-discovery.js";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

const createTempPublicDir = () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-discovery-"));
  tempDirs.push(dir);
  return dir;
};

describe("generateAgentDiscovery", () => {
  it("writes robots.txt with sitemap, content signals, and explicit AI crawler policy", () => {
    const publicDir = createTempPublicDir();

    generateAgentDiscovery({
      publicDir,
      siteUrl: "https://example.com",
      generatedAt: new Date("2026-04-28T00:00:00.000Z"),
    });

    const robotsTxt = readFileSync(join(publicDir, "robots.txt"), "utf8");

    expect(robotsTxt).toContain("User-agent: *");
    expect(robotsTxt).toContain("User-agent: GPTBot");
    expect(robotsTxt).toContain("User-agent: Claude-Web");
    expect(robotsTxt).toContain("User-agent: Google-Extended");
    expect(robotsTxt).toContain("Content-Signal: ai-train=no, search=yes, ai-input=yes");
    expect(robotsTxt).toContain("Sitemap: https://example.com/sitemap.xml");
  });

  it("writes a sitemap with canonical public routes", () => {
    const publicDir = createTempPublicDir();

    generateAgentDiscovery({
      publicDir,
      siteUrl: "https://example.com/",
      generatedAt: new Date("2026-04-28T00:00:00.000Z"),
    });

    const sitemap = readFileSync(join(publicDir, "sitemap.xml"), "utf8");

    expect(sitemap).toContain("<loc>https://example.com/</loc>");
    expect(sitemap).toContain("<loc>https://example.com/privacy-policy</loc>");
    expect(sitemap).toContain("<loc>https://example.com/terms-of-service</loc>");
    expect(sitemap).toContain("<lastmod>2026-04-28</lastmod>");
  });

  it("writes API and agent discovery documents", () => {
    const publicDir = createTempPublicDir();

    generateAgentDiscovery({
      publicDir,
      siteUrl: "https://example.com",
      generatedAt: new Date("2026-04-28T00:00:00.000Z"),
    });

    const apiCatalog = JSON.parse(readFileSync(join(publicDir, ".well-known/api-catalog"), "utf8"));
    const openApi = JSON.parse(readFileSync(join(publicDir, "openapi.json"), "utf8"));
    const skillPath = join(
      publicDir,
      ".well-known/agent-skills/pareto-agent-discovery/SKILL.md",
    );
    const skillsIndex = JSON.parse(
      readFileSync(join(publicDir, ".well-known/agent-skills/index.json"), "utf8"),
    );
    const skillDigest = createHash("sha256")
      .update(readFileSync(skillPath, "utf8"))
      .digest("hex");

    expect(apiCatalog.linkset[0].anchor).toBe("https://api.pareto.credit/");
    expect(apiCatalog.linkset[0]["service-desc"][0].href).toBe("https://example.com/openapi.json");
    expect(openApi.openapi).toBe("3.1.0");
    expect(openApi.paths["/vaults"]).toBeDefined();
    expect(existsSync(join(publicDir, ".well-known/mcp/server-card.json"))).toBe(true);
    expect(skillsIndex.$schema).toBe("https://schemas.agentskills.io/discovery/0.2.0/schema.json");
    expect(skillsIndex.skills[0].digest).toBe(`sha256:${skillDigest}`);
  });
});
