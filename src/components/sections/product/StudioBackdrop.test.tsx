import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { createStudioCurrent } from "./studioCurrent";
import StudioBackdrop from "./StudioBackdrop";

vi.mock("./studioCurrent", () => ({ createStudioCurrent: vi.fn() }));

const viewport = vi.hoisted(() => ({ visible: true }));
vi.mock("framer-motion", () => ({ useInView: () => viewport.visible }));

let reduced = false;
const preference = new EventTarget();
beforeEach(() => {
  vi.mocked(createStudioCurrent).mockReset().mockReturnValue(null);
  viewport.visible = true;
  reduced = false;
  vi.stubGlobal("matchMedia", () => ({
    matches: reduced,
    addEventListener: preference.addEventListener.bind(preference),
    removeEventListener: preference.removeEventListener.bind(preference),
  }));
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it("shows the poster if the browser blocks autoplay", async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new DOMException("", "NotAllowedError"));
  const { container } = render(<StudioBackdrop />);
  await act(async () => {});
  expect(container.querySelector("img")).toBeInTheDocument();
  expect(screen.queryByRole("button")).toBeNull();
});

it("only plays while both the backdrop and the page are visible", () => {
  const visibility = vi.spyOn(document, "visibilityState", "get");
  const { rerender } = render(<StudioBackdrop />);
  expect(screen.queryByRole("button")).toBeNull();
  visibility.mockReturnValue("hidden");
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  viewport.visible = false;
  visibility.mockReturnValue("visible");
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  viewport.visible = true;
  rerender(<StudioBackdrop />);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
});

it("loads only a still under reduced motion and responds to preference changes", () => {
  reduced = true;
  const { container } = render(<StudioBackdrop />);
  expect(container.querySelector("video")).toBeNull();
  expect(container.querySelector("img")).toBeInTheDocument();
  expect(screen.queryByRole("button")).toBeNull();
  reduced = false;
  act(() => preference.dispatchEvent(new Event("change")));
  expect(container.querySelector("video")).toBeInTheDocument();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
});

it("keeps the poster when the video cannot be decoded", () => {
  const { container } = render(<StudioBackdrop />);
  fireEvent.error(container.querySelector("video")!);
  expect(container.querySelector("img")).toBeInTheDocument();
  expect(screen.queryByRole("button")).toBeNull();
});

it("draws the native field without requesting video and keeps it still under reduced motion", () => {
  const renderer = { setRunning: vi.fn(), dispose: vi.fn() };
  vi.mocked(createStudioCurrent).mockReturnValue(renderer);
  reduced = true;
  const { container, unmount } = render(<StudioBackdrop />);
  expect(container.querySelector("canvas")).toBeInTheDocument();
  expect(container.querySelector("video")).toBeNull();
  expect(renderer.setRunning).toHaveBeenLastCalledWith(false);
  reduced = false;
  act(() => preference.dispatchEvent(new Event("change")));
  expect(renderer.setRunning).toHaveBeenLastCalledWith(true);
  expect(screen.queryByRole("button")).toBeNull();
  unmount();
  expect(renderer.dispose).toHaveBeenCalledOnce();
});

it("switches to video after losing the graphics context", () => {
  const renderer = { setRunning: vi.fn(), dispose: vi.fn() };
  vi.mocked(createStudioCurrent).mockReturnValue(renderer);
  const { container } = render(<StudioBackdrop />);
  fireEvent(container.querySelector("canvas")!, new Event("webglcontextlost"));
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(container.querySelector("video")).toBeInTheDocument();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce();
});
