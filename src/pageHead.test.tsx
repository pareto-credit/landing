import { act, render, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routeTree } from "./routeTree.gen";
import metadata from "./data/pageMetadata.json";
import { clearStaticRouteHead } from "./lib/pageHead";

vi.mock("./App", () => ({ default: () => <main>Home</main> }));
vi.mock("./pages/PersonaPage", () => ({
  default: () => <main>Audience</main>,
}));
vi.mock("./pages/ProductPage", () => ({ default: () => <main>Product</main> }));
vi.mock("./pages/DataDashboardPage", () => ({
  default: () => <main>Data</main>,
}));

beforeEach(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  document.head.innerHTML = "";
});

afterEach(() => vi.restoreAllMocks());

describe("TanStack route-managed metadata", () => {
  it("replaces metadata and canonical tags across audience, product and home navigation", async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/originators?ref=partner#benefits"],
      }),
      defaultPendingMinMs: 0,
    });
    await router.load();
    render(<RouterProvider router={router} />);
    const verify = async (
      path: "/" | "/originators" | "/capital-providers" | "/studio" | "/data"
    ) => {
      const page = metadata.pages[path];
      const url = `${metadata.siteUrl}${path === "/" ? "/" : `${path}/`}`;
      await waitFor(() => expect(document.title).toBe(page.title));
      expect(document.head.querySelectorAll("title")).toHaveLength(1);
      expect(
        document.head.querySelectorAll('meta[name="description"]')
      ).toHaveLength(1);
      expect(
        document.head.querySelector('meta[name="description"]')
      ).toHaveAttribute("content", page.description);
      expect(
        document.head.querySelectorAll('link[rel="canonical"]')
      ).toHaveLength(1);
      expect(
        document.head.querySelector('link[rel="canonical"]')
      ).toHaveAttribute("href", url);
      expect(
        document.head.querySelector('meta[property="og:url"]')
      ).toHaveAttribute("content", url);
      expect(
        document.head.querySelector('meta[property="og:image"]')
      ).toHaveAttribute("content", `${metadata.siteUrl}/social/${page.image}`);
      expect(
        document.head.querySelector('meta[name="twitter:title"]')
      ).toHaveAttribute("content", page.title);
    };
    await verify("/originators");
    for (const path of [
      "/capital-providers",
      "/studio",
      "/originators",
      "/data",
      "/",
    ] as const) {
      await act(async () => {
        await router.navigate({ to: path });
      });
      await verify(path);
    }
  });

  it("hands initial static tags to the router without removing fonts, viewport or analytics", () => {
    document.head.innerHTML =
      '<title data-static-route-head>Static title</title><meta data-static-route-head name="description" content="Static"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/fonts.css"><script id="analytics"></script>';
    clearStaticRouteHead(document);
    expect(document.head.querySelector("[data-static-route-head]")).toBeNull();
    expect(document.head.querySelector('meta[name="viewport"]')).not.toBeNull();
    expect(
      document.head.querySelector('link[rel="stylesheet"]')
    ).not.toBeNull();
    expect(document.getElementById("analytics")).not.toBeNull();
  });
});
