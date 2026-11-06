import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PreviewNumber from "./PreviewNumber";

describe("Studio numeric motion", () => {
  let frames: Map<number, FrameRequestCallback>;
  let frameId: number;
  const tick = (now: number) =>
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(now));
    });
  const visual = () =>
    screen.getByText("$31,016,216.38", {
      selector: ".preview-number__target",
    }).nextElementSibling!;

  beforeEach(() => {
    frames = new Map();
    frameId = 0;
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frames.set(++frameId, callback);
      return frameId;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("counts to a formatted balance and animates updates from the previous value", () => {
    const { rerender } = render(
      <PreviewNumber value="$31,016,216.38" running reduced={false} />
    );
    const number = visual();
    expect(number).toHaveTextContent("$0.00");
    tick(0);
    tick(450);
    expect(number).not.toHaveTextContent("$0.00");
    expect(number).not.toHaveTextContent("$31,016,216.38");
    tick(900);
    expect(number).toHaveTextContent("$31,016,216.38");
    rerender(<PreviewNumber value="$31,018,396.38" running reduced={false} />);
    expect(number).toHaveTextContent("$31,016,216.38");
    tick(1000);
    tick(1900);
    expect(number).toHaveTextContent("$31,018,396.38");
    expect(frames.size).toBe(0);
  });

  it("pauses offscreen, resumes from its current value and cancels on unmount", () => {
    const { rerender, unmount } = render(
      <PreviewNumber value="$31,016,216.38" running reduced={false} />
    );
    const number = visual();
    tick(0);
    tick(300);
    const paused = number.textContent;
    rerender(
      <PreviewNumber value="$31,016,216.38" running={false} reduced={false} />
    );
    expect(frames.size).toBe(0);
    tick(3000);
    expect(number.textContent).toBe(paused);
    rerender(<PreviewNumber value="$31,016,216.38" running reduced={false} />);
    expect(number.textContent).toBe(paused);
    unmount();
    expect(frames.size).toBe(0);
  });

  it("shows the final value immediately for reduced motion, including when enabled mid-count", () => {
    const { rerender } = render(
      <PreviewNumber value="$31,016,216.38" running reduced />
    );
    const number = visual();
    expect(number).toHaveTextContent("$31,016,216.38");
    expect(frames.size).toBe(0);
    rerender(<PreviewNumber value="$31,018,396.38" running reduced={false} />);
    tick(0);
    tick(300);
    rerender(<PreviewNumber value="$31,018,396.38" running reduced />);
    expect(number).toHaveTextContent("$31,018,396.38");
    expect(frames.size).toBe(0);
  });
});
