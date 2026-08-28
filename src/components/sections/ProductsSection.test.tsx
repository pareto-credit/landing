import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductsSection from "./ProductsSection";
import type { ProductVaultCard } from "../../types/products";

const { motionPreference } = vi.hoisted(() => ({
  motionPreference: { shouldReduce: true },
}));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => motionPreference.shouldReduce,
}));

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

const vaultCard: ProductVaultCard = {
  id: "vault-1",
  address: "0x123",
  name: "FalconX Credit Vault",
  status: "LIVE",
  apy: "8.10%",
  tvl: "$3.2M",
  operatorName: "FalconX",
  operatorCode: "falconx",
  curatorName: "Pareto",
  curatorCode: "pareto",
  subtitle: "Senior",
  description: "Institutional credit strategy.",
  redemptions: "30d",
  asset: "USD",
  type: "Fixed rate",
  visibility: "PUBLIC",
};

afterEach(() => {
  motionPreference.shouldReduce = true;
  vi.restoreAllMocks();
});

describe("ProductsSection", () => {
  it("links vault cards using the vault address as a path segment", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<ProductsSection vaults={[vaultCard]} isVaultsLoading={false} />);

    for (const link of screen.getAllByRole("link", {
      name: /open falconx credit vault vault/i,
    })) {
      expect(link).toHaveAttribute(
        "href",
        "https://app.pareto.credit/vault/0x123",
      );
    }
  });

  it("does not arm marquee dragging when pressing a vault link", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<ProductsSection vaults={[vaultCard]} isVaultsLoading={false} />);

    const viewport = document.querySelector(".marquee-scroll") as HTMLDivElement;
    const setPointerCapture = vi.fn();
    viewport.setPointerCapture = setPointerCapture;

    fireEvent.pointerDown(
      screen.getByRole("link", { name: /open falconx credit vault vault/i }),
      {
        pointerId: 1,
        clientX: 120,
      },
    );

    expect(setPointerCapture).not.toHaveBeenCalled();
  });

  it("starts marquee dragging after a horizontal move begins on a vault link", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<ProductsSection vaults={[vaultCard]} isVaultsLoading={false} />);

    const viewport = document.querySelector(".marquee-scroll") as HTMLDivElement;
    const setPointerCapture = vi.fn();
    viewport.setPointerCapture = setPointerCapture;
    viewport.hasPointerCapture = vi.fn().mockReturnValue(false);
    Object.defineProperty(viewport, "scrollLeft", {
      configurable: true,
      writable: true,
      value: 0,
    });

    const link = screen.getByRole("link", {
      name: /open falconx credit vault vault/i,
    });

    fireEvent.pointerDown(link, {
      pointerId: 1,
      clientX: 120,
    });
    fireEvent.pointerMove(link, {
      pointerId: 1,
      clientX: 90,
    });

    expect(setPointerCapture).toHaveBeenCalledWith(1);
  });

  it("renders the heading CTA in the desktop header", () => {
    render(<ProductsSection vaults={[]} isVaultsLoading={false} />);

    expect(screen.getByTestId("products-header-actions")).toContainElement(
      screen.getByRole("link", { name: /explore vaults/i }),
    );
  });

  it("renders the heading CTA in the mobile footer", () => {
    setViewportWidth(390);

    render(<ProductsSection vaults={[]} isVaultsLoading={false} />);

    expect(screen.getByTestId("products-footer-actions")).toContainElement(
      screen.getByRole("link", { name: /explore vaults/i }),
    );
  });

  it("uses a non-clipping line height for vault card titles", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<ProductsSection vaults={[vaultCard]} isVaultsLoading={false} />);

    const [title] = screen.getAllByText("FalconX Credit Vault");

    expect(title).not.toHaveClass("leading-none");
    expect(title).toHaveClass("leading-[1.2]");
  });

  it("keeps the vault marquee horizontally draggable without becoming vertically scrollable", () => {
    class ResizeObserverMock {
      observe() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });

    render(<ProductsSection vaults={[vaultCard]} isVaultsLoading={false} />);

    const viewport = document.querySelector(".marquee-scroll");

    expect(viewport).toHaveClass("overflow-x-auto", "overflow-y-hidden");
    expect(viewport?.className).not.toMatch(/\btouch-pan-[xy]\b/);
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

    render(<ProductsSection vaults={[vaultCard]} isVaultsLoading={false} />);

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

    expect(renderedScrollLeft).toBeGreaterThanOrEqual(49);
  });
});
