import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { personaPages } from "../data/personas";
import { thesisChapters, thesisProblems, thesisStats } from "../data/thesis";
import { consumePendingContactInterest } from "../lib/siteNavigation";
import EcosystemPage from "./EcosystemPage";
import PersonaPage from "./PersonaPage";
import ThesisPage from "./ThesisPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock("../components/sections/ProductsSection", () => ({
  default: () => <section id="products" data-testid="products-section" />,
}));
vi.mock("../hooks/useProductsData", () => ({
  useProductsData: () => ({
    metrics: { outstandingLoans: 155_000_000, creditExtended: 1_440_000_000 },
    vaults: [],
    isLoading: false,
  }),
}));

beforeAll(() => {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
});

describe("ThesisPage", () => {
  it("opens with the hero and a five-part contents list", () => {
    render(<ThesisPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /credit is moving onchain\.underwriting decides how fast\./i,
    );
    const contents = screen.getByRole("navigation", { name: "Contents" });
    const links = within(contents).getAllByRole("link");
    expect(links).toHaveLength(5);
    thesisChapters.forEach((chapter, index) => {
      expect(links[index]).toHaveAttribute("href", `/thesis#${chapter.id}`);
      expect(links[index]).toHaveTextContent(chapter.label);
    });
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
    expect(screen.getByLabelText("The gap")).toHaveTextContent("<2%");
  });

  it("keeps every chapter destination focusable", () => {
    render(<ThesisPage />);
    for (const chapter of thesisChapters) {
      const section = document.getElementById(chapter.id);
      const heading = document.getElementById(`${chapter.id}-title`);
      expect(section).toHaveAttribute("aria-labelledby", heading?.id);
      expect(heading).toHaveAttribute("tabindex", "-1");
    }
  });

  it("tells the three problems over the narrative videos", () => {
    render(<ThesisPage />);
    const constraints = document.getElementById("constraints")!;
    expect(constraints.querySelectorAll("video")).toHaveLength(thesisProblems.length);
    for (const problem of thesisProblems) {
      expect(within(constraints).getByRole("heading", { name: problem.title })).toBeInTheDocument();
    }
    expect(within(constraints).getByText("Distribution is siloed")).toBeInTheDocument();
  });

  it("explains how a facility maps onto Pareto", () => {
    render(<ThesisPage />);
    const chapter = document.getElementById("structured-credit")!;
    expect(within(chapter).getByText("Credit Vault")).toBeInTheDocument();
    expect(within(chapter).getByRole("heading", { name: "One Credit Vault per facility" })).toBeInTheDocument();
  });

  it.each([
    ["Join early access", "Pareto MCP early access"],
    ["Request Studio access", "Pareto Studio (Core)"],
  ])("carries %s to the appropriate contact inquiry", (label, interest) => {
    render(<ThesisPage />);
    const cta = screen.getByRole("link", { name: label });
    expect(cta).toHaveAttribute("href", "/#contact");
    fireEvent.click(cta);
    expect(consumePendingContactInterest()).toBe(interest);
  });

  it("shows live Pareto figures", () => {
    render(<ThesisPage />);

    expect(screen.getByText("$1.4B")).toBeInTheDocument();
    expect(screen.getByText("$155M")).toBeInTheDocument();
  });
});

describe("EcosystemPage", () => {
  it("describes the four roles, links each audience page and groups partners", () => {
    render(<EcosystemPage />);

    for (const role of ["Borrowers", "Underwriters & curators", "Lenders", "Distribution partners"]) {
      expect(screen.getByRole("heading", { name: role })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "Credit partners" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Infrastructure & distribution" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /visit falconx/i })).toHaveAttribute("href", "https://www.falconx.io/");

    const audiences = screen.getByRole("navigation", { name: /pages for each audience/i });
    for (const page of personaPages) {
      expect(within(audiences).getByRole("link", { name: new RegExp(page.navLabel, "i") })).toHaveAttribute(
        "href",
        `${page.path}#hero`,
      );
    }
    expect(screen.queryByTestId("products-section")).not.toBeInTheDocument();
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

describe("PersonaPage", () => {
  it("presents the originators page with both ways in and the plans", () => {
    render(<PersonaPage id="originators" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Raise a facility.Run it from one desk.");
    expect(screen.getByTestId("studio-desk")).toBeInTheDocument();
    expect(within(document.getElementById("comparison")!).getAllByRole("row")).toHaveLength(7);
    expect(screen.getByRole("heading", { name: "Borrowers" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Underwriters & curators" })).toBeInTheDocument();
    for (const plan of ["Core", "Pro", "White-Glove"]) {
      expect(screen.getByRole("heading", { name: new RegExp(`^${plan}`) })).toBeInTheDocument();
    }
    for (const name of ["Bob Rutherford", "Thibault Labidi", "Han Chang"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("products-section")).not.toBeInTheDocument();
  });

  it("routes the originators hero calls to action to the right inquiry", () => {
    render(<PersonaPage id="originators" />);
    const hero = document.getElementById("hero")!;

    fireEvent.click(within(hero).getByRole("link", { name: "Raise a facility" }));
    expect(consumePendingContactInterest()).toBe("Borrowing");
    fireEvent.click(within(hero).getByRole("link", { name: "Curate on Pareto" }));
    expect(consumePendingContactInterest()).toBe("Underwriting");
    expect(within(hero).getByRole("link", { name: "Ecosystem" })).toHaveAttribute("href", "/ecosystem#hero");
  });

  it("presents the capital providers page with live vaults and a risk note", () => {
    render(<PersonaPage id="capital-providers" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Lend to real credit.See every position onchain.");
    expect(screen.getByTestId("products-section")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See live vaults" })).toHaveAttribute(
      "href",
      "/ecosystem/capital-providers#products",
    );
    for (const name of ["Adam Bilko", "Carson Brown"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getByText(/lending involves credit risk/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /choose how much/i })).not.toBeInTheDocument();

    fireEvent.click(within(document.getElementById("hero")!).getByRole("link", { name: "Start lending" }));
    expect(consumePendingContactInterest()).toBe("Lending");
  });
});
