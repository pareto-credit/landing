import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDashboardMotion } from "./useDashboardMotion";

const preferences = vi.hoisted(() => ({ reduced: false }));
vi.mock("framer-motion", () => ({
  useReducedMotion: () => preferences.reduced,
}));

let notify: IntersectionObserverCallback;
const disconnect = vi.fn();

function Panel() {
  const motion = useDashboardMotion<HTMLDivElement>();
  return <div {...motion}>$150M</div>;
}

const intersect = (visible: boolean) => act(() => {
  notify([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);
});

beforeEach(() => {
  preferences.reduced = false;
  disconnect.mockClear();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { notify = callback; }
    observe() {}
    disconnect = disconnect;
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("dashboard motion lifecycle", () => {
  it("pauses offscreen and in hidden tabs while retaining the revealed value", () => {
    const { unmount } = render(<Panel />);
    const panel = screen.getByText("$150M");
    expect(panel).toHaveAttribute("data-running", "false");
    intersect(true);
    expect(panel).toHaveAttribute("data-running", "true");
    expect(panel).toHaveAttribute("data-entered", "true");

    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(panel).toHaveAttribute("data-running", "false");
    vi.restoreAllMocks();
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(panel).toHaveAttribute("data-running", "true");
    intersect(false);
    expect(panel).toHaveAttribute("data-running", "false");
    expect(panel).toHaveAttribute("data-entered", "true");
    expect(panel).toHaveTextContent("$150M");
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("shows the completed state without motion for reduced-motion preferences", () => {
    preferences.reduced = true;
    render(<Panel />);
    intersect(true);
    const panel = screen.getByText("$150M");
    expect(panel).toHaveAttribute("data-running", "false");
    expect(panel).toHaveAttribute("data-entered", "true");
    expect(panel).toHaveAttribute("data-reduced", "true");
  });

  it("keeps the final value readable when intersection observation is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Panel />);
    expect(screen.getByText("$150M")).toHaveAttribute("data-running", "false");
  });
});
