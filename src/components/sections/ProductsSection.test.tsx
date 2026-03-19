import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductsSection from "./ProductsSection";

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

describe("ProductsSection", () => {
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
