import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

const scrollToSection = vi.fn();

vi.mock("../../lib/scrollToSection", () => ({
  scrollToSection: (...args: unknown[]) => scrollToSection(...args),
}));

describe("Navbar", () => {
  afterEach(() => {
    scrollToSection.mockReset();
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
    vi.useFakeTimers();
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle mobile menu/i,
    });

    fireEvent.click(toggleButton);
    const dialog = screen.getByRole("dialog", { name: /site navigation/i });

    fireEvent.click(within(dialog).getByRole("button", { name: /studio/i }));

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(scrollToSection).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(scrollToSection).toHaveBeenCalledWith("studio");
  });

  it("groups homepage sections under a Solutions dropdown", () => {
    render(<Navbar />);

    expect(screen.queryByTestId("solutions-menu")).not.toBeInTheDocument();

    const solutions = screen.getByRole("button", { name: /solutions/i });
    fireEvent.click(solutions);

    expect(solutions).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByTestId("solutions-menu");
    for (const label of ["Pareto Studio", "Agents", "Plans", "Vaults"]) {
      expect(within(menu).getByRole("button", { name: new RegExp(label) })).toBeInTheDocument();
    }

    fireEvent.click(within(menu).getByRole("button", { name: /vaults/i }));
    expect(scrollToSection).toHaveBeenCalledWith("products");
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

    expect(screen.getByRole("button", { name: "Ecosystem" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Thesis" })).toBeInTheDocument();
  });

  it("falls back to a full navigation for pages when no router is mounted", () => {
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, pathname: "/", assign });

    render(<Navbar />);
    fireEvent.click(screen.getAllByRole("button", { name: "Thesis" })[0]);

    expect(assign).toHaveBeenCalledWith("/thesis");
    vi.unstubAllGlobals();
  });
});
