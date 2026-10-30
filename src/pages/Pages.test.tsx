import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { thesisChapters, thesisStats } from "../data/thesis";
import { consumePendingContactInterest } from "../lib/siteNavigation";
import ThesisPage from "./ThesisPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer data-testid="footer" /> }));

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
  it("opens with one claim and removes the inline chapter legend", () => {
    render(<ThesisPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /^credit is moving onchain\.$/i,
    );
    expect(screen.queryByRole("navigation", { name: "Contents" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read the thesis" })).toHaveAttribute("href", "/thesis#structured-credit");
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

  it("shows one constraint claim at a time without a second prose column", () => {
    render(<ThesisPage />);
    const constraints = document.getElementById("constraints")!;
    expect(within(constraints).getAllByRole("heading", { level: 3 })).toHaveLength(1);
    expect(within(constraints).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Credit markets run on a stack of legacy systems, patched together over decades.",
    );
    expect(within(constraints).queryByText("Distribution is siloed")).not.toBeInTheDocument();
  });

  it("explains how a facility adapts through the same layers as Clients", () => {
    render(<ThesisPage />);
    const chapter = document.getElementById("structured-credit")!;
    expect(within(chapter).getByText("Credit Vault")).toBeInTheDocument();
    expect(within(chapter).getByRole("group", { name: "Connect modules to Credit Vault" })).toBeInTheDocument();
    expect(within(chapter).getAllByRole("checkbox")).toHaveLength(6);
  });

  it("carries Studio access to the appropriate contact inquiry", () => {
    render(<ThesisPage />);
    const cta = screen.getByRole("link", { name: "Request Studio access" });
    expect(cta).toHaveAttribute("href", "/#contact");
    cta.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(cta);
    expect(consumePendingContactInterest()).toBe("Pareto Studio (Core)");
  });

  it("keeps Why Pareto to four value propositions and removes retired destinations", () => {
    render(<ThesisPage />);

    const reasons = document.getElementById("why-pareto")!;
    expect(within(reasons).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Familiar", "Verifiable", "Efficient", "Composable",
    ]);
    expect(document.getElementById("accountability-title")).not.toBeInTheDocument();
    expect(document.getElementById("roadmap")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /roadmap/i })).not.toBeInTheDocument();
  });
});
