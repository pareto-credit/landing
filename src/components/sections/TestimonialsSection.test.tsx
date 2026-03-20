import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TestimonialsSection from "./TestimonialsSection";

vi.mock("framer-motion", () => ({
  useReducedMotion: () => true,
}));

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
});
