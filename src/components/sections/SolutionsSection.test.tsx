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
});
