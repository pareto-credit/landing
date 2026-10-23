import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import Navbar from "./Navbar";

const renderAt = (entry: string) => {
  const root = createRootRoute({ component: Navbar });
  const routes = ["/", "/ecosystem", "/thesis"].map((path) =>
    createRoute({ getParentRoute: () => root, path, component: () => null }),
  );
  const router = createRouter({
    routeTree: root.addChildren(routes),
    history: createMemoryHistory({ initialEntries: [entry] }),
    defaultPendingMinMs: 0,
  });
  render(<RouterProvider router={router} />);
};

describe("Navbar", () => {
  afterEach(() => {
    document.body.style.overflow = "";
    vi.useRealTimers();
  });

  it("opens a full-screen mobile menu and locks page scroll", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /toggle mobile menu/i }));

    const dialog = screen.getByRole("dialog", { name: /site navigation/i });
    const menuContent = screen.getByTestId("mobile-menu-content");
    const menuNav = screen.getByTestId("mobile-menu-nav");

    expect(dialog).toHaveClass("fixed", "inset-0");
    expect(dialog).toHaveClass("overflow-hidden");
    expect(menuContent).toHaveClass("h-[100svh]");
    expect(menuNav).not.toHaveClass("overflow-y-auto");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("switches to the light logo while the mobile menu is open", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /toggle mobile menu/i }));

    expect(screen.getByAltText("Pareto logo")).toHaveAttribute(
      "src",
      expect.stringContaining("pareto-logo-light.svg"),
    );
  });

  it("closes the mobile menu on escape", async () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /toggle mobile menu/i }));
    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: /site navigation/i }),
      ).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("navigates to a section and closes the mobile menu", async () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle mobile menu/i,
    });

    fireEvent.click(toggleButton);
    const dialog = screen.getByRole("dialog", { name: /site navigation/i });

    const studio = within(dialog).getByRole("link", { name: /studio/i });
    expect(studio).toHaveAttribute("href", "/#studio");
    fireEvent.click(studio);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("groups homepage sections under a Solutions dropdown", () => {
    render(<Navbar />);

    expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument();

    const solutions = screen.getByRole("button", { name: /solutions/i });
    fireEvent.click(solutions);

    expect(solutions).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByTestId("solutions-menu");
    for (const label of ["Pareto Studio", "Agents", "Offering", "Vaults"]) {
      expect(within(menu).getByRole("link", { name: new RegExp(label) })).toBeInTheDocument();
    }

    fireEvent.click(within(menu).getByRole("link", { name: /vaults/i }));
    expect(within(menu).getByRole("link", { name: /vaults/i })).toHaveAttribute("href", "/#products");
  });

  it("closes the Solutions dropdown on escape", async () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /solutions/i }));
    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument();
    });
  });

  it("keeps Ecosystem and Thesis as top-level links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Ecosystem" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Thesis" })).toBeInTheDocument();
  });

  it("keeps ordinary URLs available without a router", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Thesis" })).toHaveAttribute("href", "/thesis");
    expect(screen.getByRole("link", { name: "Ecosystem" })).toHaveAttribute("href", "/ecosystem");
  });

  it("dismisses the dropdown when scrolling away", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /solutions/i }));
    fireEvent.scroll(window);
    await waitFor(() => expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument());
  });

  it("moves the current-page state after client navigation", async () => {
    renderAt("/ecosystem");
    const ecosystem = await screen.findByRole("link", { name: "Ecosystem" });
    expect(ecosystem).toHaveAttribute("aria-current", "page");
    const thesis = screen.getByRole("link", { name: "Thesis" });
    expect(thesis).not.toHaveAttribute("aria-current");

    fireEvent.click(thesis);
    await waitFor(() => expect(thesis).toHaveAttribute("aria-current", "page"));
    expect(ecosystem).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: /solutions/i })).not.toHaveAttribute("data-active");
  });

  it("identifies the current page in the mobile menu", async () => {
    renderAt("/ecosystem");
    fireEvent.click(await screen.findByRole("button", { name: /toggle mobile menu/i }));
    const dialog = screen.getByRole("dialog", { name: /site navigation/i });
    expect(within(dialog).getByRole("link", { name: /ecosystem/i })).toHaveAttribute("aria-current", "page");
    expect(within(dialog).getByRole("link", { name: /thesis/i })).not.toHaveAttribute("aria-current");
  });

  it("marks the homepage group and the selected solution", async () => {
    renderAt("/#offering");
    const solutions = await screen.findByRole("button", { name: /solutions/i });
    expect(solutions).toHaveAttribute("data-active", "true");
    fireEvent.click(solutions);
    const menu = screen.getByTestId("solutions-menu");
    expect(within(menu).getByRole("link", { name: /offering/i })).toHaveAttribute("aria-current", "location");
    expect(within(menu).getByRole("link", { name: /vaults/i })).not.toHaveAttribute("aria-current");
  });
});
