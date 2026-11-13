import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { thesisChapters, thesisStats } from "../data/thesis";
import ThesisPage from "./ThesisPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav data-testid="navbar" /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer data-testid="footer" /> }));

const intersectionCallbacks = new Map<Element, () => void>();

beforeEach(() => {
  intersectionCallbacks.clear();
  class IntersectionObserverStub {
    private callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    observe(target: Element) {
      intersectionCallbacks.set(target, () => {
        this.callback([{ target, isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      });
    }
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
    expect(screen.getByRole("link", { name: "Read the thesis" })).toHaveAttribute("href", "/thesis#thesis-intro");
    const intro = document.getElementById("thesis-intro");
    expect(intro?.previousElementSibling).toHaveAttribute("id", "hero");
    expect(intro?.nextElementSibling).toHaveAttribute("id", "structured-credit");
    expect(intro).toHaveTextContent("Asset-backed finance turns the cash flows");
    expect(intro).toHaveTextContent("Pareto is building the infrastructure to bring that credit onchain");
    expect(screen.queryByText("Investment thesis")).not.toBeInTheDocument();
  });

  it("cites a dated source for every market figure", () => {
    render(<ThesisPage />);

    const opportunity = within(document.getElementById("opportunity")!);
    const marketBars = within(opportunity.getByRole("list"));
    for (const stat of thesisStats) {
      expect(marketBars.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: new RegExp(stat.source.split(",")[0], "i") })).toHaveAttribute(
        "href",
        stat.url,
      );
    }
    const gap = screen.getByLabelText("The gap");
    expect(gap).toHaveTextContent("<2%");
    const chart = within(gap).getByRole("group", { name: "Private and tokenized credit" });
    const innerCircle = within(chart).getByRole("button", { name: "Tokenized credit: $38B" });
    expect((Number.parseFloat(innerCircle.style.getPropertyValue("--circle-share")) / 100) ** 2).toBeCloseTo(38 / 2000, 6);
  });

  it("shows the value for the circle under the pointer and dismisses it on exit", () => {
    const { container } = render(<ThesisPage />);
    const privateCircle = screen.getByRole("button", { name: "Private credit: +$2T" });
    const tokenizedCircle = screen.getByRole("button", { name: "Tokenized credit: $38B" });
    const tooltip = container.querySelector<HTMLElement>(".thesis-scale__gap-tooltip")!;
    expect(tooltip).toHaveAttribute("data-visible", "false");

    fireEvent.pointerEnter(privateCircle, { clientX: 80, clientY: 120, pointerType: "mouse" });
    expect(tooltip).toHaveAttribute("data-visible", "true");
    expect(tooltip).toHaveTextContent("+$2T");
    const originalY = tooltip.style.getPropertyValue("--tooltip-y");
    fireEvent.pointerMove(privateCircle, { clientX: 100, clientY: 150, pointerType: "mouse" });
    expect(tooltip.style.getPropertyValue("--tooltip-y")).not.toBe(originalY);

    fireEvent.pointerLeave(privateCircle);
    fireEvent.pointerEnter(tokenizedCircle, { clientX: 100, clientY: 170, pointerType: "mouse" });
    expect(tooltip).toHaveTextContent("$38B");
    fireEvent.pointerLeave(tokenizedCircle);
    expect(tooltip).toHaveAttribute("data-visible", "false");
  });

  it("reveals each market bar when its own track enters view", () => {
    const { container } = render(<ThesisPage />);
    const tracks = [...container.querySelectorAll(".thesis-scale__track")];
    expect(tracks).toHaveLength(thesisStats.length);

    for (const track of tracks) {
      expect(track).not.toHaveAttribute("data-revealed");
      const enterView = intersectionCallbacks.get(track);
      expect(enterView).toBeDefined();
      act(() => enterView?.());
      expect(track).toHaveAttribute("data-revealed", "true");
    }
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

  it("demonstrates the reusable Credit Vault model", () => {
    render(<ThesisPage />);
    const chapter = document.getElementById("structured-credit")!;
    expect(within(chapter).getByRole("heading", { name: "The business comes first" })).toBeInTheDocument();
    expect(within(chapter).getByText(/^Pareto’s modular smart contract architecture/)).toBeVisible();
    const heading = within(chapter).getByRole("heading", { name: "One vault. Different credit structures" });
    expect(within(heading).getByText("Different credit structures")).toHaveClass("text-[var(--color-text-muted)]");
    expect(within(chapter).getByText("Credit Vault")).toBeInTheDocument();
    expect(within(chapter).getByRole("group", { name: "Connect modules to Credit Vault" })).toBeInTheDocument();
    expect(within(chapter).getAllByRole("checkbox")).toHaveLength(6);
  });

  it("links the diagram to Why Pareto and offers general and investor enquiries", async () => {
    render(<ThesisPage />);

    const chapter = document.getElementById("structured-credit")!;
    const cta = within(chapter).getByRole("link", { name: "Learn more" });
    expect(cta).toHaveAttribute("href", "/thesis#why-pareto");
    fireEvent.click(cta);
    await waitFor(() => expect(document.getElementById("why-pareto-title")).toHaveFocus());

    const contact = screen.getByRole("region", { name: "Get in touch" });
    expect(contact.previousElementSibling).toHaveAttribute("id", "why-pareto");
    expect(within(contact).getByRole("link", { name: "explore platform data" })).toHaveAttribute("href", "/data");
    const form = within(contact).getByRole<HTMLFormElement>("form");
    expect(form).toHaveAttribute("action", "https://formspree.io/f/xkgjlnwg");
    const interest = within(form).getByRole("combobox", { name: /interested in/i });
    expect(interest).toHaveValue("General enquiry");
    expect(new FormData(form).get("interestedIn")).toBe("General enquiry");
    expect(within(interest).getByRole("option", { name: "Investing in Pareto" })).toBeInTheDocument();
    fireEvent.change(interest, { target: { value: "Investing in Pareto" } });
    expect(new FormData(form).get("interestedIn")).toBe("Investing in Pareto");
    expect(within(form).getByRole("button", { name: "Send enquiry" })).toBeVisible();
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
