import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PersonaPage from "./PersonaPage";
import { consumePendingContactInterest } from "../lib/siteNavigation";
import { personaPages } from "../data/personas";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer /> }));
vi.mock("framer-motion", async (importOriginal) => ({
  ...(await importOriginal<typeof import("framer-motion")>()),
  useInView: () => true,
  useReducedMotion: () => true,
}));
vi.mock("../components/sections/studio/StudioDesk", () => ({
  default: () => <div data-testid="studio-desk" />,
}));
describe("audience pages", () => {
  it("offers exactly the two canonical audience destinations", () => {
    expect(personaPages.map((page) => page.path)).toEqual([
      "/originators",
      "/capital-providers",
    ]);
  });

  it("lets originators inspect each facility decision with the keyboard", () => {
    render(<PersonaPage id="originators" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Financing built around your business."
    );
    const tabs = screen.getByRole("tablist", {
      name: "Build around every layer.",
    });
    const first = within(tabs).getByRole("tab", { name: /application/i });
    const next = within(tabs).getByRole("tab", { name: /eligibility/i });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(next).toHaveFocus();
    expect(next).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tabpanel", { name: /eligibility/i })
    ).toHaveAccessibleName(/eligibility/i);
    fireEvent.keyDown(next, { key: "End" });
    expect(
      within(tabs).getByRole("tab", { name: /distribution/i })
    ).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(first).toHaveFocus();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Ecosystem" })
    ).not.toBeInTheDocument();
  });

  it.each(["originators", "capital-providers"] as const)(
    "links the stacked planes and their explanations on %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const tabs = screen.getByRole("tablist");
      const eligibility = within(tabs).getByRole("tab", { name: "Eligibility" });
      fireEvent.mouseEnter(eligibility);
      expect(eligibility).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tabpanel", { name: "Eligibility" })).toBeVisible();

      const underwriting = within(tabs).getByRole("tab", { name: "Underwriting" });
      const plate = underwriting.querySelector("svg")!;
      expect(plate).not.toBeNull();
      fireEvent.mouseEnter(plate);
      expect(underwriting).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tabpanel", { name: "Underwriting" })).toBeVisible();

      const servicing = within(tabs).getByRole("tab", { name: "Servicing" });
      fireEvent.click(servicing.querySelector("svg")!);
      expect(servicing).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tabpanel", { name: "Servicing" })).toBeVisible();
    }
  );

  it("selects a layer when its control receives keyboard focus", () => {
    render(<PersonaPage id="originators" />);
    const eligibility = screen.getByRole("tab", { name: "Eligibility" });
    fireEvent.focus(eligibility);
    expect(eligibility).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Eligibility" })).toBeVisible();
  });

  it("keeps the focused layer summary in place when another plane is hovered", () => {
    render(<PersonaPage id="originators" />);
    const panel = screen.getByRole("tabpanel", { name: /application/i });
    panel.focus();
    const eligibility = screen.getByRole("tab", { name: "Eligibility" });
    fireEvent.mouseEnter(eligibility);
    expect(panel).toHaveFocus();
    expect(panel).toBeVisible();
    expect(eligibility).toHaveAttribute("aria-selected", "false");

    fireEvent.focus(eligibility);
    expect(eligibility).toHaveAttribute("aria-selected", "true");
  });

  it.each(["originators", "capital-providers"] as const)(
    "uses an abstract hero instead of a product demo on %s",
    (id) => {
      const { container } = render(<PersonaPage id={id} />);
      expect(
        Array.from(container.querySelectorAll("main > section")).map(
          (section) => section.id
        )
      ).toEqual([
        "hero",
        "benefits",
        "framework",
        "experience",
        "questions",
        "get-started",
      ]);
      const hero = screen.getByRole("region", {
        name:
          id === "originators"
            ? "Financing built around your business."
            : "A broader perspective on credit.",
      });
      expect(
        within(hero).getByTestId("audience-hero-visual")
      ).toBeInTheDocument();
      expect(within(hero).queryByTestId("studio-desk")).not.toBeInTheDocument();
      expect(within(hero).queryByRole("table")).not.toBeInTheDocument();
      expect(within(hero).queryByRole("tablist")).not.toBeInTheDocument();
    }
  );

  it("routes facility and underwriting inquiries to the existing contact form", () => {
    render(<PersonaPage id="originators" />);
    fireEvent.click(
      screen.getByRole("link", { name: "Discuss your financing needs" })
    );
    expect(consumePendingContactInterest()).toBe("Borrowing");
    fireEvent.click(
      screen.getByRole("link", { name: "Build your credit infrastructure" })
    );
    expect(consumePendingContactInterest()).toBe("Underwriting");
    expect(screen.getByRole("link", { name: "Talk to us" })).toHaveAttribute(
      "href",
      "/#contact"
    );
  });

  it("gives capital allocators layers to evaluate and a direct route to the Lender App", () => {
    render(<PersonaPage id="capital-providers" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A broader perspective on credit."
    );
    expect(
      screen.getByRole("link", { name: "Explore live facilities" })
    ).toHaveAttribute("href", "https://app.pareto.credit/");
    const tabs = screen.getByRole("tablist", {
      name: "Understand every layer.",
    });
    fireEvent.click(within(tabs).getByRole("tab", { name: /servicing/i }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Follow your position through its lifecycle.");
    expect(screen.queryByTestId("studio-desk")).not.toBeInTheDocument();
    expect(
      screen.getByText(/lending involves credit risk/i)
    ).toBeInTheDocument();
  });

  it.each(["originators", "capital-providers"] as const)(
    "shows the selected concise summary without a layer disclosure for %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const panel = screen.getByRole("tabpanel", { name: /application/i });
      const layers = personaPages.find((page) => page.id === id)!.framework.items;
      expect(panel).toHaveTextContent(layers[0].summary);
      expect(panel.querySelector("details")).toBeNull();
      expect(screen.queryByText("Explore this layer")).not.toBeInTheDocument();
      const tabs = screen.getByRole("tablist");
      fireEvent.click(within(tabs).getByRole("tab", { name: /eligibility/i }));
      expect(screen.getByRole("tabpanel", { name: /eligibility/i })).toHaveTextContent(layers[1].summary);
      fireEvent.click(within(tabs).getByRole("tab", { name: /application/i }));
      expect(screen.getByRole("tabpanel", { name: /application/i })).toHaveTextContent(layers[0].summary);
    }
  );

  it.each(["originators", "capital-providers"] as const)(
    "answers practical questions for %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const faq = screen.getByRole("region", {
        name: "Your questions answered",
      });
      const answers = within(faq).getAllByRole("button");
      expect(answers.length).toBeGreaterThanOrEqual(5);
      fireEvent.click(answers[0]);
      expect(answers[0]).toHaveAttribute("aria-expanded", "true");
      fireEvent.click(answers[1]);
      expect(answers[1]).toHaveAttribute("aria-expanded", "true");
      expect(answers[0]).toHaveAttribute("aria-expanded", "false");
      expect(document.getElementById(answers[0].getAttribute("aria-controls")!))
        .toHaveAttribute("aria-hidden", "true");
      fireEvent.click(answers[1]);
      expect(answers.every((answer) => answer.getAttribute("aria-expanded") === "false"))
        .toBe(true);
      expect(
        screen.getByRole("heading", { name: "Credit in practice." })
      ).toBeInTheDocument();
    }
  );

  it.each(["originators", "capital-providers"] as const)(
    "shows the published stories first and FalconX coming soon for %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const stories = screen.getByRole("region", {
        name: "Credit in practice.",
      });
      const articles = within(stories).getAllByRole("article");
      expect(articles.map((article) => article.getAttribute("aria-label"))).toEqual([
        "RockawayX story",
        "M11 Credit story",
        "FalconX story",
      ]);
      const links = within(stories).getAllByRole("link");
      expect(links.map((link) => link.getAttribute("href"))).toEqual([
        "https://paragraph.com/@pareto/invested-15-minutes-rockawayx-case-study",
        "https://paragraph.com/@pareto/institutional-credit-structured-discipline-traditional-finance-m11credit-casestudy",
      ]);
      for (const link of links) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
      expect(within(articles[2]).getByText("COMING SOON")).toBeVisible();
      expect(within(articles[2]).queryByRole("link")).not.toBeInTheDocument();
      articles[2].focus();
      expect(articles[2]).toHaveFocus();
      expect(articles.map((article) => within(article).getByRole("img").getAttribute("alt"))).toEqual([
        "RockawayX",
        "M11 Credit",
        "FalconX",
      ]);
    }
  );
});
