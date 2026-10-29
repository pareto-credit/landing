import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import Navbar from "./Navbar";

const renderAt = (entry: string) => {
  const root = createRootRoute({ component: Navbar });
  const routes = [
    "/",
    "/originators",
    "/capital-providers",
    "/thesis",
    "/credit-vaults",
    "/studio",
    "/data",
  ].map((path) =>
    createRoute({ getParentRoute: () => root, path, component: () => null })
  );
  const router = createRouter({
    routeTree: root.addChildren(routes),
    history: createMemoryHistory({ initialEntries: [entry] }),
    defaultPendingMinMs: 0,
  });
  render(<RouterProvider router={router} />);
};

describe("Navbar", () => {
  it("uses the light logo over the Thesis hero and restores the normal logo on scroll", async () => {
    renderAt("/thesis");
    await waitFor(() => expect(screen.getByAltText("Pareto logo")).toHaveAttribute("src", expect.stringContaining("pareto-logo-light.svg")));
    expect(screen.getByAltText("Pareto logo").closest("nav")).toHaveAttribute("data-hero-tone", "dark");
    const original = Object.getOwnPropertyDescriptor(window, "scrollY")!;
    try {
      Object.defineProperty(window, "scrollY", { value: 80, configurable: true });
      fireEvent.scroll(window);
      expect(screen.getByAltText("Pareto logo")).toHaveAttribute("src", expect.stringContaining("pareto-logo.svg"));
      expect(screen.getByAltText("Pareto logo").closest("nav")).not.toHaveAttribute("data-hero-tone");
    } finally {
      Object.defineProperty(window, "scrollY", original);
    }
  });

  it("toggles a desktop menu closed with a second keyboard activation", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "About" });
    fireEvent.click(trigger, { detail: 0 });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(trigger, { detail: 0 });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
  afterEach(() => {
    document.body.style.overflow = "";
    vi.useRealTimers();
  });

  it("opens a full-screen mobile menu and locks page scroll", () => {
    render(<Navbar />);

    fireEvent.click(
      screen.getByRole("button", { name: /toggle mobile menu/i })
    );

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

    fireEvent.click(
      screen.getByRole("button", { name: /toggle mobile menu/i })
    );

    expect(screen.getByAltText("Pareto logo")).toHaveAttribute(
      "src",
      expect.stringContaining("pareto-logo-light.svg")
    );
  });

  it("closes the mobile menu on escape", async () => {
    render(<Navbar />);

    fireEvent.click(
      screen.getByRole("button", { name: /toggle mobile menu/i })
    );
    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: /site navigation/i })
      ).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("navigates to a product page and closes the mobile menu", () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle mobile menu/i,
    });

    fireEvent.click(toggleButton);
    const dialog = screen.getByRole("dialog", { name: /site navigation/i });

    const studio = within(dialog).getByRole("link", { name: /studio/i });
    expect(studio).toHaveAttribute("href", "/studio");
    fireEvent.click(studio);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("offers only the two dedicated product pages in Solutions", () => {
    render(<Navbar />);

    expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument();

    const solutions = screen.getByRole("button", { name: /solutions/i });
    fireEvent.click(solutions);

    expect(solutions).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByTestId("solutions-menu");
    expect(
      within(menu).getByRole("link", { name: /credit vaults/i })
    ).toHaveAttribute("href", "/credit-vaults");
    expect(
      within(menu).getByRole("link", { name: /pareto studio/i })
    ).toHaveAttribute("href", "/studio");
    expect(within(menu).getAllByRole("listitem")).toHaveLength(2);
    expect(
      within(menu).queryByRole("link", { name: /offering/i })
    ).not.toBeInTheDocument();
    expect(
      within(menu).queryByRole("link", { name: /agents/i })
    ).not.toBeInTheDocument();
  });

  it("closes the Solutions dropdown on escape", async () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /solutions/i }));
    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument();
    });
  });

  it("groups the client audiences under Clients", () => {
    render(<Navbar />);

    const ecosystem = screen.getByRole("button", { name: "Clients" });
    expect(screen.getByRole("button", { name: "About" })).toBeInTheDocument();
    fireEvent.click(ecosystem);

    const menu = screen.getByTestId("audiences-menu");
    expect(
      within(menu).getByRole("link", { name: /originators/i })
    ).toHaveAttribute("href", "/originators");
    expect(
      within(menu).getByRole("link", { name: /capital allocators/i })
    ).toHaveAttribute("href", "/capital-providers");
    expect(within(menu).getAllByRole("listitem")).toHaveLength(2);
    expect(
      within(menu).queryByRole("link", { name: /roles & partners/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument();
  });

  it("keeps only one dropdown open at a time", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /solutions/i }));
    fireEvent.mouseEnter(
      screen.getByRole("button", { name: "Clients" }).parentElement!
    );
    expect(screen.getByTestId("audiences-menu")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clients" })
    ).toHaveAttribute("aria-expanded", "true");
    // Framer's exit animation never completes in jsdom, so assert the state, not removal.
    expect(screen.getByRole("button", { name: /solutions/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("keeps ordinary URLs available without a router", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "About" }));
    const about = screen.getByTestId("about-menu");
    expect(
      within(about).getByRole("link", { name: /thesis/i })
    ).toHaveAttribute("href", "/thesis");
    expect(
      within(about).getByRole("link", { name: /data dashboard/i })
    ).toHaveAttribute("href", "/data");
    fireEvent.click(screen.getByRole("button", { name: "Clients" }));
    expect(screen.getByRole("link", { name: /originators/i })).toHaveAttribute(
      "href",
      "/originators"
    );
  });

  it("dismisses the dropdown when scrolling away", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /solutions/i }));
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument()
    );
  });

  it("moves the current-page state after client navigation", async () => {
    renderAt("/originators");
    const ecosystem = await screen.findByRole("button", {
      name: "Clients",
    });
    expect(ecosystem).toHaveAttribute("data-active", "true");
    fireEvent.click(ecosystem);
    expect(
      within(screen.getByTestId("audiences-menu")).getByRole("link", {
        name: /originators/i,
      })
    ).toHaveAttribute("aria-current", "page");
    const about = screen.getByRole("button", { name: "About" });
    expect(about).not.toHaveAttribute("data-active");

    fireEvent.click(about);
    fireEvent.click(
      within(screen.getByTestId("about-menu")).getByRole("link", {
        name: /thesis/i,
      })
    );
    await waitFor(() => expect(about).toHaveAttribute("data-active", "true"));
    fireEvent.click(about);
    expect(
      within(screen.getByTestId("about-menu")).getByRole("link", {
        name: /thesis/i,
      })
    ).toHaveAttribute("aria-current", "page");
    expect(ecosystem).not.toHaveAttribute("data-active");
    expect(
      screen.getByRole("button", { name: /solutions/i })
    ).not.toHaveAttribute("data-active");
  });

  it.each(["/thesis", "/data"])(
    "marks the About destination for %s as current",
    async (entry) => {
      renderAt(entry);
      const toggle = await screen.findByRole("button", { name: "About" });
      expect(toggle).toHaveAttribute("data-active", "true");
      fireEvent.click(toggle);
      const currentLink = within(screen.getByTestId("about-menu")).getByRole(
        "link",
        { name: entry === "/thesis" ? /thesis/i : /data dashboard/i }
      );
      expect(currentLink).toHaveAttribute("aria-current", "page");
      expect(
        screen.queryByRole("button", { name: "Thesis chapters" })
      ).not.toBeInTheDocument();
    }
  );

  it.each(["/credit-vaults", "/studio"])(
    "marks the Solutions destination for %s as current",
    async (entry) => {
      renderAt(entry);
      const toggle = await screen.findByRole("button", { name: "Solutions" });
      expect(toggle).toHaveAttribute("data-active", "true");
      fireEvent.click(toggle);
      expect(
        within(screen.getByTestId("solutions-menu")).getByRole("link", {
          name: entry === "/studio" ? /pareto studio/i : /credit vaults/i,
        })
      ).toHaveAttribute("aria-current", "page");
    }
  );

  it("identifies the current page in the mobile menu", async () => {
    renderAt("/originators");
    fireEvent.click(
      await screen.findByRole("button", { name: /toggle mobile menu/i })
    );
    const dialog = screen.getByRole("dialog", { name: /site navigation/i });
    expect(
      within(dialog).getByRole("link", { name: /originators/i })
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(dialog).getByRole("link", { name: /thesis/i })
    ).not.toHaveAttribute("aria-current");
  });

  it("keeps the homepage Solutions group active without selecting a product", async () => {
    renderAt("/#offering");
    const solutions = await screen.findByRole("button", { name: /solutions/i });
    expect(solutions).toHaveAttribute("data-active", "true");
    fireEvent.click(solutions);
    const menu = screen.getByTestId("solutions-menu");
    expect(
      within(menu).queryByRole("link", { name: /offering/i })
    ).not.toBeInTheDocument();
    expect(
      within(menu).getByRole("link", { name: /vaults/i })
    ).not.toHaveAttribute("aria-current");
  });

  it("offers three contextual About destinations with a native external Brand link", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "About" }));
    const menu = screen.getByTestId("about-menu");
    expect(within(menu).getAllByRole("listitem")).toHaveLength(3);
    expect(
      within(menu).getByRole("link", { name: /thesis.*vision/i })
    ).toHaveAttribute("href", "/thesis");
    expect(
      within(menu).getByRole("link", { name: /data dashboard.*metrics/i })
    ).toHaveAttribute("href", "/data");
    const brand = within(menu).getByRole("link", {
      name: /brand.*assets.*guidelines/i,
    });
    expect(brand).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/resources/media-kit"
    );
    expect(brand).toHaveAttribute("target", "_blank");
    expect(brand).toHaveAttribute("rel", "noopener noreferrer");
    expect(brand).not.toHaveAttribute("aria-current");
  });

  it("opens About on hover and coordinates it with Solutions", () => {
    render(<Navbar />);
    const about = screen.getByRole("button", { name: "About" });
    fireEvent.mouseEnter(about.parentElement!);
    expect(about).toHaveAttribute("aria-expanded", "true");
    fireEvent.mouseEnter(
      screen.getByRole("button", { name: /solutions/i }).parentElement!
    );
    expect(about).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("solutions-menu")).toBeInTheDocument();
  });

  it("opens About on focus and closes when focus leaves its menu", () => {
    render(<Navbar />);
    const about = screen.getByRole("button", { name: "About" });
    fireEvent.focus(about);
    expect(about).toHaveAttribute("aria-expanded", "true");
    const thesis = within(screen.getByTestId("about-menu")).getByRole("link", {
      name: /thesis/i,
    });
    fireEvent.blur(about, { relatedTarget: thesis });
    expect(about).toHaveAttribute("aria-expanded", "true");
    fireEvent.blur(thesis, {
      relatedTarget: screen.getByRole("button", {
        name: /toggle mobile menu/i,
      }),
    });
    expect(about).toHaveAttribute("aria-expanded", "false");
  });

  it("closes About on Escape and returns focus to its trigger", () => {
    render(<Navbar />);
    const about = screen.getByRole("button", { name: "About" });
    fireEvent.click(about);
    within(screen.getByTestId("about-menu"))
      .getByRole("link", { name: /thesis/i })
      .focus();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(about).toHaveAttribute("aria-expanded", "false");
    expect(about).toHaveFocus();
  });

  it("closes About on an outside pointer or after leaving the dropdown", async () => {
    render(<Navbar />);
    const about = screen.getByRole("button", { name: "About" });
    fireEvent.click(about);
    fireEvent.pointerDown(document.body);
    expect(about).toHaveAttribute("aria-expanded", "false");
    fireEvent.mouseEnter(about.parentElement!);
    fireEvent.mouseLeave(about.parentElement!);
    await waitFor(() =>
      expect(about).toHaveAttribute("aria-expanded", "false")
    );
  });

  it("offers the same product and About destinations on mobile", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle mobile menu/i });
    fireEvent.click(toggle);
    const dialog = screen.getByRole("dialog", { name: /site navigation/i });
    expect(
      within(dialog).getByRole("link", { name: /credit vaults/i })
    ).toHaveAttribute("href", "/credit-vaults");
    expect(
      within(dialog).getByRole("link", { name: /pareto studio/i })
    ).toHaveAttribute("href", "/studio");
    expect(
      within(dialog).getByRole("link", { name: /thesis/i })
    ).toHaveAttribute("href", "/thesis");
    expect(
      within(dialog).getByRole("link", { name: /data dashboard/i })
    ).toHaveAttribute("href", "/data");
    const brand = within(dialog).getByRole("link", { name: /brand/i });
    expect(brand).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/resources/media-kit"
    );
    expect(brand).toHaveAttribute("target", "_blank");
    expect(brand).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      within(dialog).queryByRole("link", { name: /agents/i })
    ).not.toBeInTheDocument();
    fireEvent.click(brand);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });
});
