import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "./routeTree.gen";

describe("audience route compatibility", () => {
  it.each([
    ["/originators", "/originators"],
    ["/capital-providers", "/capital-providers"],
    ["/ecosystem", "/"],
    ["/ecosystem/originators", "/originators"],
    ["/ecosystem/capital-providers", "/capital-providers"],
  ])("resolves %s to %s", async (from, to) => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: [from] }),
      defaultPendingMinMs: 0,
    });
    await router.load();
    expect(router.state.location.pathname).toBe(to);
    expect(router.state.matches.at(-1)?.status).toBe("success");
  });

  it("preserves query parameters and a chapter destination on legacy audience links", async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/ecosystem/originators?ref=partner#framework"],
      }),
      defaultPendingMinMs: 0,
    });
    await router.load();
    expect(router.state.location.pathname).toBe("/originators");
    expect(router.state.location.hash).toBe("framework");
    expect(router.state.location.search).toEqual({ ref: "partner" });
  });

  it.each([
    ["problem", "benefits"],
    ["comparison", "framework"],
    ["paths", "framework"],
    ["how-it-works", "framework"],
    ["proof", "experience"],
    ["plans", "framework"],
    ["get-started", "get-started"],
  ])("maps the old section #%s to #%s", async (oldHash, newHash) => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: [`/ecosystem/originators#${oldHash}`],
      }),
      defaultPendingMinMs: 0,
    });
    await router.load();
    expect(router.state.location.pathname).toBe("/originators");
    expect(router.state.location.hash).toBe(newHash);
  });

  it.each([
    ["/originators", "participation", "framework"],
    ["/originators", "getting-started", "framework"],
    ["/capital-providers", "products", "hero"],
    ["/capital-providers", "operations", "hero"],
  ])(
    "keeps retired sections on %s usable (%s)",
    async (path, oldHash, newHash) => {
      const router = createRouter({
        routeTree,
        history: createMemoryHistory({
          initialEntries: [`${path}?ref=partner#${oldHash}`],
        }),
        defaultPendingMinMs: 0,
      });
      await router.load();
      expect(router.state.location.pathname).toBe(path);
      expect(router.state.location.hash).toBe(newHash);
      expect(router.state.location.search).toEqual({ ref: "partner" });
    }
  );

  it("preserves campaign context when redirecting the former hub", async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/ecosystem?ref=partner"],
      }),
      defaultPendingMinMs: 0,
    });
    await router.load();
    expect(router.state.location.pathname).toBe("/");
    expect(router.state.location.search).toEqual({ ref: "partner" });
  });
});
