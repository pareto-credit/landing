// @vitest-environment node
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
// The CLI uses the exact standalone aggregator that is typechecked in src/.
import { refreshDashboardData } from "./refresh-dashboard-data.mjs";

describe("history cache refresh", () => {
  it("preserves a good cache if the source fails and leaves no temporary file", async () => {
    const directory = await mkdtemp(join(tmpdir(), "pareto-history-test-"));
    const outputPath = join(directory, "credit-history.json");
    try {
      await writeFile(outputPath, '{"previous":"verified"}\n');
      const get = vi.fn().mockResolvedValue(new Response("", {status: 503}));
      await expect(refreshDashboardData({get, outputPath})).rejects.toThrow(/503/);
      expect(await readFile(outputPath, "utf8")).toBe('{"previous":"verified"}\n');
      expect(await readdir(directory)).toEqual(["credit-history.json"]);
    } finally {
      await rm(directory, {recursive: true, force: true});
    }
  });
});
