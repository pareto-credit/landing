import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { thesisChapters, thesisStats } from "../data/thesis";
import ThesisPage from "./ThesisPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer data-testid="footer" /> }));

beforeEach(() => {
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

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ThesisPage", () => {
  it("opens with one claim and removes the inline chapter legend", () => {
    render(<ThesisPage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/^credit is moving onchain$/i);
    expect(within(heading).getByText("onchain")).toHaveClass("text-[var(--color-text-muted-inverse)]");
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

  it("keeps chapter destinations focusable and visible chapter eyebrows unnumbered", () => {
    render(<ThesisPage />);
    for (const chapter of thesisChapters) {
      const section = document.getElementById(chapter.id);
      const heading = document.getElementById(`${chapter.id}-title`);
      const header = section?.querySelector<HTMLElement>("[data-section-header]");
      expect(section).toHaveAttribute("aria-labelledby", heading?.id);
      expect(heading).toHaveAttribute("tabindex", "-1");
      if (chapter.id === "constraints") {
        expect(header).toBeNull();
        expect(heading).toHaveClass("sr-only");
        continue;
      }
      expect(header).toContainElement(heading);
      expect(within(header!).getByText(chapter.label, { exact: true })).toBeVisible();
      expect(heading?.querySelector("span")).toHaveClass("text-[var(--color-text-muted)]");
    }
  });

  it("shows one constraint claim at a time without a second prose column", () => {
    render(<ThesisPage />);
    const constraints = document.getElementById("constraints")!;
    expect(within(constraints).getAllByRole("heading", { level: 3 })).toHaveLength(1);
    expect(within(constraints).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Credit markets run on a stack of legacy systems, patched together over decades",
    );
    expect(within(constraints).queryByText("Distribution is siloed")).not.toBeInTheDocument();
  });

  it("explains how a facility adapts through the same layers as Clients", () => {
    render(<ThesisPage />);
    const chapter = document.getElementById("structured-credit")!;
    const heading = within(chapter).getByRole("heading", { name: "One vault. Your combination" });
    expect(within(heading).getByText("Your combination")).toHaveClass("text-[var(--color-text-muted)]");
    expect(within(chapter).getByText("Credit Vault")).toBeInTheDocument();
    expect(within(chapter).getByRole("group", { name: "Connect modules to Credit Vault" })).toBeInTheDocument();
    expect(within(chapter).getAllByRole("checkbox")).toHaveLength(6);
  });

  it("scrolls to the local contact form on every Structured Credit CTA click", async () => {
    render(<ThesisPage />);

    const chapter = document.getElementById("structured-credit")!;
    const cta = within(chapter).getByRole("link", { name: "Discuss your facility" });
    expect(cta.previousElementSibling).toBe(within(chapter).getByRole("status"));
    expect(cta).toHaveAttribute("href", "/thesis#contact");
    const contact = screen.getByRole("region", { name: "Let’s talk about your credit facility" });
    expect(contact).toHaveAttribute("id", "contact");
    expect(contact.previousElementSibling).toHaveAttribute("id", "why-pareto");
    const contactHeading = within(contact).getByRole("heading", { level: 2 });
    expect(within(contactHeading).getByText("your credit facility")).toHaveClass("text-[var(--color-text-muted)]");
    const form = within(contact).getByRole("form");
    const interest = within(form).getByRole("combobox", { name: /interested in/i });
    expect(interest).toHaveValue("Borrowing");
    expect(within(form).getByRole("button", { name: "Send enquiry" })).toBeInTheDocument();
    expect(screen.queryByText("Pareto today")).not.toBeInTheDocument();

    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.spyOn(contact, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 1000, 800, 600));
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    fireEvent.click(cta);
    expect(scrollTo).toHaveBeenCalledWith({ top: 928, behavior: "smooth" });
    await waitFor(() => expect(interest).toHaveFocus());
    fireEvent.click(cta);
    expect(scrollTo).toHaveBeenCalledTimes(2);
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
