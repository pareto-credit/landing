import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { thesisStats } from "../data/thesis";
import { consumePendingContactInterest } from "../lib/siteNavigation";
import EcosystemPage from "./EcosystemPage";
import ThesisPage from "./ThesisPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock("../components/sections/NarrativeScrollSection", () => ({
  default: () => <section data-testid="narrative-scroll" />,
}));
vi.mock("../components/sections/ProductsSection", () => ({
  default: () => <section data-testid="products-section" />,
}));
vi.mock("../components/sections/TestimonialsSection", () => ({
  default: () => <section data-testid="testimonials-section" />,
}));
vi.mock("../components/sections/EcosystemSection", () => ({
  default: () => <section data-testid="ecosystem-segments" />,
}));
vi.mock("../hooks/useProductsData", () => ({
  useProductsData: () => ({
    metrics: { outstandingLoans: 155_000_000, creditExtended: 1_440_000_000 },
    vaults: [],
    isLoading: false,
  }),
}));

describe("ThesisPage", () => {
  it("opens with the briefing hero and keeps the legacy narrative scroll", () => {
    render(<ThesisPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /credit is moving onchain\.underwriting decides how fast\./i,
    );
    expect(screen.getByTestId("narrative-scroll")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: /thesis chapters/i })).getAllByRole("link")).toHaveLength(6);
  });

  it("cites a dated source for every market figure", () => {
    render(<ThesisPage />);

    for (const stat of thesisStats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: new RegExp(stat.source.split(",")[0], "i") })).toHaveAttribute(
        "href",
        stat.url,
      );
    }
  });

  it("shows live Pareto figures", () => {
    render(<ThesisPage />);

    expect(screen.getByText("$1.4B")).toBeInTheDocument();
    expect(screen.getByText("$155M")).toBeInTheDocument();
  });
});

describe("EcosystemPage", () => {
  it("describes the four roles and groups partners", () => {
    render(<EcosystemPage />);

    for (const role of ["Borrowers", "Underwriters & curators", "Lenders", "Distribution partners"]) {
      expect(screen.getByRole("heading", { name: role })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "Credit partners" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Infrastructure & distribution" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /visit falconx/i })).toHaveAttribute("href", "https://www.falconx.io/");
    expect(screen.getByTestId("products-section")).toBeInTheDocument();
  });

  it.each([
    ["Raise a facility", "Borrowing"],
    ["Curate on Pareto", "Underwriting"],
    ["Start lending", "Lending"],
    ["Integrate", "Integration"],
  ])("carries %s into the homepage contact form", (label, interest) => {
    render(<EcosystemPage />);

    const cta = screen.getByRole("link", { name: label });
    expect(cta).toHaveAttribute("href", "/#contact");

    fireEvent.click(cta);

    expect(consumePendingContactInterest()).toBe(interest);
  });
});
