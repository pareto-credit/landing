import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductsSection from "./ProductsSection";
import type { ProductVaultCard } from "../../types/products";

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
  vi.restoreAllMocks();
});

describe("ProductsSection", () => {
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
});
