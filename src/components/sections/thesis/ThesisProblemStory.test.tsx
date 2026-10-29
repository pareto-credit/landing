import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { motionValue } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThesisProblemStory from "./ThesisProblemStory";

const motionState = vi.hoisted(() => ({ reduced: false, inView: true, mobileActive: null as number | null }));
const progress = motionValue(0);
const nearObservers: IntersectionObserverCallback[] = [];

vi.mock("framer-motion", async (importOriginal) => ({
  ...await importOriginal<typeof import("framer-motion")>(),
  useReducedMotion: () => motionState.reduced,
  useInView: (ref: { current: HTMLElement | null }) => motionState.inView && (
    motionState.mobileActive === null ||
    (ref.current !== null && ref.current.parentElement?.children[motionState.mobileActive] === ref.current)
  ),
  useScroll: () => ({ scrollYProgress: progress }),
}));

beforeEach(() => {
  motionState.reduced = false;
  motionState.inView = true;
  motionState.mobileActive = null;
  progress.set(0);
  nearObservers.length = 0;
  vi.stubGlobal("innerWidth", 1440);
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { nearObservers.push(callback); }
    observe() {}
    disconnect() {}
  });
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const enterLoadRange = () => act(() => {
  for (const callback of nearObservers) callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
});

describe("ThesisProblemStory", () => {
  it("defers video loading and changes the single visible claim with scroll", () => {
    const { container } = render(<ThesisProblemStory />);
    const videos = Array.from(container.querySelectorAll("video"));
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    expect(videos).toHaveLength(3);
    expect(videos.every((video) => !video.getAttribute("src"))).toBe(true);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);

    enterLoadRange();
    expect(videos.every((video) => video.getAttribute("src"))).toBe(true);
    expect(play.mock.contexts).toEqual([videos[0]]);
    play.mockClear();

    act(() => progress.set(0.5));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Trillions deployed. Still managed on spreadsheets and phone calls.");
    expect(play.mock.contexts).toEqual([videos[1]]);
    act(() => progress.set(1));
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Opacity is the norm, and risk hides in the gaps between systems.");
  });

  it("lets keyboard readers select scenes without scrolling through every viewport", () => {
    render(<ThesisProblemStory />);
    const first = screen.getByRole("tab", { name: "Scene 1: Legacy systems" });
    const last = screen.getByRole("tab", { name: "Scene 3: Risk in the gaps" });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(last).toHaveFocus();
    expect(last).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    fireEvent.keyDown(last, { key: "Home" });
    expect(first).toHaveFocus();
    expect(screen.getAllByRole("tab").filter((tab) => tab.tabIndex === 0)).toEqual([first]);
  });

  it("places the newly selected claim next in the forward keyboard order", () => {
    const { container } = render(<ThesisProblemStory />);
    const first = screen.getByRole("tab", { name: "Scene 1: Legacy systems" });
    fireEvent.keyDown(first, { key: "ArrowRight" });
    const selected = screen.getByRole("tab", { selected: true });
    const panel = screen.getByRole("tabpanel");
    const focusOrder = Array.from(container.querySelectorAll<HTMLElement>('button, [role="tabpanel"], a'))
      .filter(element => element.tabIndex >= 0 && !element.closest("[hidden]"));

    expect(selected).toHaveFocus();
    expect(panel).toHaveAttribute("aria-labelledby", selected.id);
    expect(focusOrder[focusOrder.indexOf(selected) + 1]).toBe(panel);
    expect(focusOrder).toEqual([
      selected,
      panel,
      screen.getByRole("button", { name: "Pause background videos" }),
      screen.getByRole("link", { name: "Skip to the opportunity" }),
    ]);
  });

  it("plays only the visible mobile scene and keeps pause shared between stacked scenes", () => {
    vi.stubGlobal("innerWidth", 390);
    motionState.mobileActive = 0;
    const { container, rerender } = render(<ThesisProblemStory />);
    const videos = Array.from(container.querySelectorAll("video"));
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    const pause = vi.mocked(HTMLMediaElement.prototype.pause);
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    enterLoadRange();
    expect(play.mock.contexts).toEqual([videos[0]]);

    play.mockClear();
    pause.mockClear();
    motionState.mobileActive = 1;
    rerender(<ThesisProblemStory />);
    expect(pause.mock.contexts).toContain(videos[0]);
    expect(play.mock.contexts).toEqual([videos[1]]);
    fireEvent.click(screen.getAllByRole("button", { name: "Pause background videos" })[1]);
    play.mockClear();
    motionState.mobileActive = 2;
    rerender(<ThesisProblemStory />);
    expect(play).not.toHaveBeenCalled();
    expect(screen.getAllByRole("button", { name: "Resume background videos" })).toHaveLength(3);
    fireEvent.click(screen.getAllByRole("button", { name: "Resume background videos" })[2]);
    expect(play.mock.contexts).toEqual([videos[2]]);
  });

  it("pauses on hidden tabs and respects an explicit pause across scene changes", () => {
    const { container } = render(<ThesisProblemStory />);
    enterLoadRange();
    const videos = Array.from(container.querySelectorAll("video"));
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    const pause = vi.mocked(HTMLMediaElement.prototype.pause);
    play.mockClear();
    pause.mockClear();

    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    expect(pause.mock.contexts).toContain(videos[0]);
    expect(play).not.toHaveBeenCalled();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    fireEvent(document, new Event("visibilitychange"));
    expect(play.mock.contexts).toEqual([videos[0]]);

    fireEvent.click(screen.getByRole("button", { name: "Pause background videos" }));
    play.mockClear();
    act(() => progress.set(0.5));
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Resume background videos" }));
    expect(play.mock.contexts).toEqual([videos[1]]);
  });

  it("pauses playback when the story leaves view and when it unmounts", () => {
    const { container, rerender, unmount } = render(<ThesisProblemStory />);
    enterLoadRange();
    const first = container.querySelector("video")!;
    const pause = vi.mocked(HTMLMediaElement.prototype.pause);
    pause.mockClear();
    motionState.inView = false;
    rerender(<ThesisProblemStory />);
    expect(pause.mock.contexts).toContain(first);
    motionState.inView = true;
    rerender(<ThesisProblemStory />);
    pause.mockClear();
    unmount();
    expect(pause.mock.contexts).toContain(first);
  });

  it("keeps all claims readable with static posters and no video downloads under reduced motion", () => {
    motionState.reduced = true;
    const { container } = render(<ThesisProblemStory />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    expect(container.querySelectorAll("video")).toHaveLength(0);
    expect(container.querySelectorAll('img[alt=""]')).toHaveLength(3);
    expect(screen.queryByRole("button", { name: /background videos/i })).not.toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });
});
