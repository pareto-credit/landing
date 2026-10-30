import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PageLink } from "./PageLink";

const originalScrollIntoView = Object.getOwnPropertyDescriptor(Element.prototype, "scrollIntoView");

const setup = async () => {
  const scrollIntoView = vi.fn();
  vi.stubGlobal("scrollTo", vi.fn());
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });
  const root = createRootRoute({ component: () => <Outlet /> });
  const home = createRoute({ getParentRoute: () => root, path: "/", component: () => <section id="studio">Studio destination</section> });
  const ecosystem = createRoute({ getParentRoute: () => root, path: "/ecosystem", component: () => <>
    <PageLink to="/" hash="studio">Open Studio</PageLink>
    <PageLink to="/" target="_blank">New tab</PageLink>
  </> });
  const router = createRouter({ routeTree: root.addChildren([home, ecosystem]), history: createMemoryHistory({ initialEntries: ["/ecosystem"] }), scrollRestoration: true });
  render(<RouterProvider router={router} />);
  await screen.findByRole("link", { name: "Open Studio" });
  return { router, scrollIntoView };
};

describe("PageLink", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (originalScrollIntoView) Object.defineProperty(Element.prototype, "scrollIntoView", originalScrollIntoView);
    else Reflect.deleteProperty(Element.prototype, "scrollIntoView");
  });

  it("routes cross-page anchors once after the destination renders", async () => {
    const { router, scrollIntoView } = await setup();
    fireEvent.click(screen.getByRole("link", { name: "Open Studio" }));
    await screen.findByText("Studio destination");
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    expect(router.state.location.hash).toBe("studio");
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
  });

  it("preserves modified-click and target=_blank browser behavior", async () => {
    const { router } = await setup();
    const modified = new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true });
    screen.getByRole("link", { name: "Open Studio" }).dispatchEvent(modified);
    expect(modified.defaultPrevented).toBe(false);
    const newTab = new MouseEvent("click", { bubbles: true, cancelable: true });
    screen.getByRole("link", { name: "New tab" }).dispatchEvent(newTab);
    expect(newTab.defaultPrevented).toBe(false);
    expect(router.state.location.pathname).toBe("/ecosystem");
  });
});
