import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import EcosystemSection from "./EcosystemSection";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  type MotionMockProps = React.HTMLAttributes<HTMLElement> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
    viewport?: unknown;
    whileInView?: unknown;
  };

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) =>
        React.forwardRef<HTMLElement, MotionMockProps>(
          (
            {
              children,
              initial: _initial,
              animate: _animate,
              exit: _exit,
              transition: _transition,
              viewport: _viewport,
              whileInView: _whileInView,
              ...props
            },
            ref,
          ) =>
            React.createElement(tag, { ...props, ref }, children),
        ),
    },
  );

  return {
    motion,
    useReducedMotion: () => true,
  };
});

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("EcosystemSection", () => {
  it("uses a draggable horizontal carousel on mobile", () => {
    setViewportWidth(390);

    render(<EcosystemSection />);

    expect(screen.getByTestId("ecosystem-track")).toHaveClass(
      "marquee-scroll",
      "overflow-x-auto",
      "touch-pan-x",
      "snap-x",
      "snap-mandatory",
    );
  });

  it("renders mobile pagination dots for the ecosystem slider", () => {
    setViewportWidth(390);

    render(<EcosystemSection />);

    const dots = screen.getAllByRole("button", { name: /go to ecosystem card/i });

    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-current", "true");
  });

  it("keeps the desktop grid layout on larger screens", () => {
    setViewportWidth(1280);

    render(<EcosystemSection />);

    expect(screen.getByTestId("ecosystem-track")).toHaveClass(
      "grid",
      "grid-cols-3",
    );
    expect(screen.getByTestId("ecosystem-track")).not.toHaveClass(
      "overflow-x-auto",
    );
    expect(
      screen.queryByRole("button", { name: /go to ecosystem card/i }),
    ).not.toBeInTheDocument();
  });

  it("captures pointer drag on mobile to scroll the ecosystem cards", () => {
    setViewportWidth(390);

    render(<EcosystemSection />);

    const track = screen.getByTestId("ecosystem-track") as HTMLDivElement;
    const setPointerCapture = vi.fn();

    track.setPointerCapture = setPointerCapture;
    track.releasePointerCapture = vi.fn();
    track.hasPointerCapture = vi.fn().mockReturnValue(false);

    Object.defineProperty(track, "scrollLeft", {
      configurable: true,
      writable: true,
      value: 100,
    });

    fireEvent.pointerDown(track, {
      pointerId: 1,
      clientX: 120,
    });
    fireEvent.pointerMove(track, {
      pointerId: 1,
      clientX: 90,
    });

    expect(setPointerCapture).toHaveBeenCalledWith(1);
    expect(track.scrollLeft).toBe(130);
  });

  it("scrolls to the selected ecosystem card when a pagination dot is pressed", () => {
    setViewportWidth(390);

    render(<EcosystemSection />);

    const track = screen.getByTestId("ecosystem-track") as HTMLDivElement;
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;

    const secondCard = screen.getByTestId("ecosystem-card-1");
    Object.defineProperty(secondCard, "offsetLeft", {
      configurable: true,
      value: 280,
    });

    fireEvent.click(
      screen.getByRole("button", { name: /go to ecosystem card 2/i }),
    );

    expect(scrollTo).toHaveBeenCalledWith({
      left: 280,
      behavior: "smooth",
    });
  });
});
