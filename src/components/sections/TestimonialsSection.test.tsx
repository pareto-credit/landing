import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TestimonialsSection from "./TestimonialsSection";

const { motionPreference } = vi.hoisted(() => ({
  motionPreference: { shouldReduce: true },
}));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => motionPreference.shouldReduce,
}));

afterEach(() => {
  motionPreference.shouldReduce = true;
  vi.restoreAllMocks();
});

describe("TestimonialsSection", () => {
  it("keeps the testimonial marquee horizontally draggable without becoming vertically scrollable", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<TestimonialsSection />);

    const viewport = document.querySelector(".marquee-scroll");

    expect(viewport).toHaveClass("overflow-x-auto", "overflow-y-hidden");
    expect(viewport?.className).not.toMatch(/\btouch-pan-[xy]\b/);
  });

  it("does not arm testimonial dragging on pointer down alone", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<TestimonialsSection />);

    const viewport = document.querySelector(
      ".marquee-scroll",
    ) as HTMLDivElement;
    const setPointerCapture = vi.fn();
    viewport.setPointerCapture = setPointerCapture;

    fireEvent.pointerDown(viewport, {
      pointerId: 1,
      clientX: 120,
      clientY: 0,
    });

    expect(setPointerCapture).not.toHaveBeenCalled();
  });

  it("starts testimonial dragging after a horizontal move begins", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<TestimonialsSection />);

    const viewport = document.querySelector(
      ".marquee-scroll",
    ) as HTMLDivElement;
    const setPointerCapture = vi.fn();
    viewport.setPointerCapture = setPointerCapture;
    viewport.hasPointerCapture = vi.fn().mockReturnValue(false);

    Object.defineProperty(viewport, "scrollLeft", {
      configurable: true,
      writable: true,
      value: 100,
    });

    fireEvent.pointerDown(viewport, {
      pointerId: 1,
      clientX: 120,
      clientY: 0,
    });
    fireEvent.pointerMove(viewport, {
      pointerId: 1,
      clientX: 90,
      clientY: 0,
    });

    expect(setPointerCapture).toHaveBeenCalledWith(1);
  });

  it("retains fractional auto-scroll progress when the browser rounds scrollLeft", () => {
    motionPreference.shouldReduce = false;
    let nextFrame: FrameRequestCallback | undefined;

    class ResizeObserverMock {
      private readonly callback: ResizeObserverCallback;

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
      }

      observe(target: Element) {
        this.callback(
          [{ target } as ResizeObserverEntry],
          this as unknown as ResizeObserver,
        );
      }

      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(1_000);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      nextFrame = callback;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    render(<TestimonialsSection />);

    const viewport = document.querySelector(".marquee-scroll") as HTMLDivElement;
    let renderedScrollLeft = 0;
    Object.defineProperty(viewport, "scrollLeft", {
      configurable: true,
      get: () => renderedScrollLeft,
      set: (value: number) => {
        renderedScrollLeft = Math.trunc(value);
      },
    });

    act(() => {
      nextFrame?.(0);
      for (let frame = 1; frame <= 60; frame += 1) {
        nextFrame?.((frame * 1_000) / 60);
      }
    });

    expect(renderedScrollLeft).toBeGreaterThanOrEqual(37);
  });
});
