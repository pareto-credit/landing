import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NarrativeScrollSection, {
  getVisibleVideoKeys,
  WINDOW_RADIUS_PX,
} from "./NarrativeScrollSection";

vi.mock("framer-motion", async () => {
  const React = await import("react");

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) =>
        React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
          ({ children, ...props }, ref) =>
            React.createElement(tag, { ...props, ref }, children),
        ),
    },
  );

  return {
    motion,
    useMotionTemplate: () => "",
    useMotionValueEvent: () => {},
    useScroll: () => ({
      scrollYProgress: {
        get: () => 0,
      },
    }),
    useTransform: () => 1,
  };
});

describe("NarrativeScrollSection", () => {
  it("keeps the desktop narrative window radius aligned with the tighter UI radii", () => {
    expect(WINDOW_RADIUS_PX).toBe(18);
  });

  it("switches active videos over shorter scroll transition bands", () => {
    expect(getVisibleVideoKeys(0.13)).toEqual(["serverRoom"]);
    expect(getVisibleVideoKeys(0.16)).toEqual(["serverRoom", "tradingDesk"]);
    expect(getVisibleVideoKeys(0.21)).toEqual(["tradingDesk"]);

    expect(getVisibleVideoKeys(0.42)).toEqual(["tradingDesk"]);
    expect(getVisibleVideoKeys(0.46)).toEqual([
      "tradingDesk",
      "financialDocuments",
    ]);
    expect(getVisibleVideoKeys(0.5)).toEqual(["financialDocuments"]);

    expect(getVisibleVideoKeys(0.7)).toEqual(["financialDocuments"]);
    expect(getVisibleVideoKeys(0.74)).toEqual([
      "financialDocuments",
      "hyperCity",
    ]);
    expect(getVisibleVideoKeys(0.78)).toEqual(["hyperCity"]);
  });

  it("uses lighter compositor-friendly layers for scroll performance", () => {
    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      writable: true,
      value: vi.fn(() => Promise.resolve()),
    });

    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    class IntersectionObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: IntersectionObserverMock,
    });

    const { container } = render(<NarrativeScrollSection />);

    expect(container.querySelector("section")).toHaveClass("h-[480vh]");

    expect(
      container.querySelector(".backdrop-blur-2xl"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(".backdrop-saturate-150"),
    ).not.toBeInTheDocument();

    for (const video of container.querySelectorAll("video")) {
      expect(video).not.toHaveAttribute("poster");
    }

    const firstVideoLayer = container.querySelector("video")?.parentElement;

    expect(firstVideoLayer).toHaveClass(
      "transform-gpu",
      "will-change-[opacity]",
    );
  });
});
