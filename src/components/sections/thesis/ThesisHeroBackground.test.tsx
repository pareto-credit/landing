import { act, fireEvent, render, screen } from "@testing-library/react";
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
  it("lets readers pause and resume the background, retaining their choice after scrolling away", () => {
    render(<ThesisHeroBackground />);
    const pause = screen.getByRole("button", { name: "Pause background motion" });
    const background = document.getElementById(pause.getAttribute("aria-controls")!)!;
    expect(background).toHaveAttribute("aria-hidden", "true");
    expect(pause.closest('[aria-hidden="true"]')).toBeNull();
    setVisible(true);
    expect(background).toHaveAttribute("data-running", "true");
    fireEvent.click(pause);
    expect(background).toHaveAttribute("data-paused", "true");
    setVisible(false);
    setVisible(true);
    expect(background).toHaveAttribute("data-paused", "true");
    fireEvent.click(screen.getByRole("button", { name: "Resume background motion" }));
    expect(background).toHaveAttribute("data-paused", "false");
    expect(screen.getByRole("button", { name: "Pause background motion" })).toBeInTheDocument();
  });

  it("omits playback controls when reduced motion makes the background static", () => {
    preferences.reduced = true;
    const { container } = render(<ThesisHeroBackground />);
    setVisible(true);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("data-reduced", "true");
    expect(container.firstElementChild).toHaveAttribute("data-running", "false");
  });
});
