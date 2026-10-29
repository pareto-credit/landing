import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "./routeTree.gen";

describe("product and data routes", () => {
  it.each([
    ["/credit-vaults", "pricing"],
    ["/studio", "pricing"],
    ["/data", "facilities-title"],
  ])("resolves %s and preserves a deep link", async (path, hash) => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: [`${path}?ref=partner#${hash}`],
      }),
      defaultPendingMinMs: 0,
    });
    await router.load();
    expect(router.state.location.pathname).toBe(path);
    expect(router.state.location.hash).toBe(hash);
    expect(router.state.location.search).toEqual({ ref: "partner" });
    expect(router.state.matches.at(-1)?.status).toBe("success");
  });
});
