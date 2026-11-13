import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThesisHeroBackground from "./ThesisHeroBackground";

const preferences = vi.hoisted(() => ({ reduced: false }));
vi.mock("framer-motion", async importOriginal => ({
  ...await importOriginal<typeof import("framer-motion")>(),
  useReducedMotion: () => preferences.reduced,
}));

let intersect: IntersectionObserverCallback;
beforeEach(() => {
  preferences.reduced = false;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe() {}
    disconnect() {}
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const setVisible = (visible: boolean) => act(() => {
  intersect([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);
});

describe("Thesis hero motion", () => {
  it("moves while in view and stops when the hero leaves the viewport", () => {
    const { container } = render(<ThesisHeroBackground />);
    const background = container.firstElementChild;
    expect(background).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    setVisible(true);
    expect(background).toHaveAttribute("data-running", "true");
    setVisible(false);
    expect(background).toHaveAttribute("data-running", "false");
  });

  it("keeps the background static with reduced motion", () => {
    preferences.reduced = true;
    const { container } = render(<ThesisHeroBackground />);
    setVisible(true);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("data-reduced", "true");
    expect(container.firstElementChild).toHaveAttribute("data-running", "false");
  });
});
