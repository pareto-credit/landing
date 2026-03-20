import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SolutionsSection from "./SolutionsSection";

vi.mock("../../lib/scrollToSection", () => ({
  scrollToSection: vi.fn(),
}));

describe("SolutionsSection", () => {
  it("centers the listing CTAs on mobile and keeps desktop left alignment", () => {
    render(<SolutionsSection />);

    expect(
      screen.getByRole("button", { name: /request access/i }).parentElement,
    ).toHaveClass("justify-center", "lg:justify-start");
    expect(
      screen.getByRole("button", { name: /request setup/i }).parentElement,
    ).toHaveClass("justify-center", "lg:justify-start");
  });

  it("places the White Label visual after the mobile CTA block", () => {
    render(<SolutionsSection />);

    const whiteLabelCopy = screen
      .getByRole("heading", { name: /pareto white label/i })
      .closest('[data-testid="white-label-copy-slot"]');
    const whiteLabelVisual = screen.getByTestId("white-label-visual-slot");

    expect(whiteLabelCopy).toHaveClass("order-1");
    expect(whiteLabelVisual).toHaveClass("order-2");
  });
});
