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

    fireEvent.click(within(dialog).getByRole("button", { name: /solutions/i }));

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(scrollToSection).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(scrollToSection).toHaveBeenCalledWith("solutions");
  });
});
