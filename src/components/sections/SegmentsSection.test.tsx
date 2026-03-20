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

  it("renders the newly added partner links", () => {
    render(<SegmentsSection />);

    expect(
      screen.getByRole("link", { name: /visit gauntlet/i }),
    ).toHaveAttribute("href", "https://www.gauntlet.xyz/");
    expect(
      screen.getByRole("link", { name: /visit steakhouse/i }),
    ).toHaveAttribute("href", "https://www.steakhouse.financial/");
    expect(screen.getByRole("link", { name: /visit morpho/i })).toHaveAttribute(
      "href",
      "https://morpho.org/",
    );
    expect(
      screen.getByRole("link", { name: /visit keyring/i }),
    ).toHaveAttribute("href", "https://www.keyring.network/");
    expect(screen.getByRole("link", { name: /visit euler/i })).toHaveAttribute(
      "href",
      "https://euler.finance/",
    );
  });
});
