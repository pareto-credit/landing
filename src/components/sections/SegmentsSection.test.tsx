import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SegmentsSection from "./SegmentsSection";

describe("SegmentsSection", () => {
  it("renders the Adaptive Frontier partner link", () => {
    render(<SegmentsSection />);

    const link = screen.getByRole("link", { name: /visit adaptive frontier/i });
    const logo = within(link).getByAltText("Adaptive Frontier");

    expect(link).toHaveAttribute("href", "https://www.adaptivefrontier.com/");
    expect(link).toContainElement(logo);
    const src = logo.getAttribute("src") ?? "";
    expect(src).toMatch(/adaptivefrontier\.png|data:image\/png/);
  });
});
