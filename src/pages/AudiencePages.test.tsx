import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PersonaPage from "./PersonaPage";
import { consumePendingContactInterest } from "../lib/siteNavigation";
import { scrollToSection } from "../lib/scrollToSection";
import { personaPages } from "../data/personas";

vi.mock("../lib/scrollToSection", () => ({ scrollToSection: vi.fn() }));
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

  it.each(["originators", "capital-providers"] as const)(
    "keeps each infrastructure explanation beside its selectable layer on %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const page = personaPages.find((page) => page.id === id)!;
      const section = screen.getByRole("region", { name: page.framework.title });
      const rows = within(within(section).getByRole("list")).getAllByRole("listitem");

      expect(rows).toHaveLength(6);
      page.framework.items.forEach((layer, index) => {
        const row = within(rows[index]);
        expect(row.getByRole("button", { name: layer.title })).toHaveAccessibleDescription(layer.description);
        expect(row.getByText(layer.description)).toBeVisible();
        expect(rows[index].querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      });
      const eligibility = within(rows[1]).getByRole("button", { name: "Eligibility" });
      expect(rows[0]).toHaveAttribute("data-active", "true");
      fireEvent.focus(eligibility);
      expect(eligibility).toHaveAttribute("aria-pressed", "true");
      expect(rows[1]).toHaveAttribute("data-active", "true");

      const underwriting = within(rows[2]).getByRole("button", { name: "Underwriting" });
      const underwritingPlate = rows[2].querySelector(".credit-layers__plate-hit")!;
      fireEvent.pointerOver(underwritingPlate, { pointerType: "mouse" });
      expect(rows[2]).toHaveAttribute("data-active", "true");
      expect(underwriting).toHaveAttribute("aria-pressed", "false");
      fireEvent.pointerOut(underwritingPlate, { pointerType: "mouse" });
      expect(rows[1]).toHaveAttribute("data-active", "true");

      const action = within(section).getByRole("link", { name: page.frameworkCta.label });
      expect(section.querySelector("[data-section-header]")).toContainElement(action);
    }
  );

  it.each(["originators", "capital-providers"] as const)(
    "uses the photo header, breadcrumbs and exploration link on %s",
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
        "contact",
      ]);
      const hero = screen.getByRole("region", {
        name:
          id === "originators"
            ? "Financing built around your business"
            : "A broader perspective on credit",
      });
      const breadcrumb = within(hero).getByRole("navigation", {
        name: "Breadcrumb",
      });
      expect(
        within(breadcrumb).getByRole("link", { name: "Home" })
      ).toHaveAttribute("href", "/");
      expect(within(breadcrumb).getByText("Clients")).toBeInTheDocument();
      expect(
        within(breadcrumb).getByText(
          id === "originators" ? "Originators" : "Capital Allocators"
        )
      ).toHaveAttribute("aria-current", "page");
      const [label, href] =
        id === "originators"
          ? ["Explore Pareto Studio", "/studio"]
          : ["Explore live vaults", "/#products"];
      expect(within(hero).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
      expect(within(hero).queryByRole("button")).not.toBeInTheDocument();
      expect(within(hero).queryByTestId("studio-desk")).not.toBeInTheDocument();
      expect(within(hero).queryByRole("table")).not.toBeInTheDocument();
      expect(within(hero).queryByRole("tablist")).not.toBeInTheDocument();
    }
  );

  it("ends Originators with the shared enquiry form and borrowing selected", () => {
    render(<PersonaPage id="originators" />);
    const form = screen.getByRole("form", { name: "Let’s build around your business" });
    expect(form).toHaveAttribute("action", "https://formspree.io/f/xkgjlnwg");
    expect(form).toHaveAttribute("method", "POST");
    expect(screen.getByText("GET IN TOUCH")).toBeInTheDocument();
    expect(within(form).getByRole("combobox", { name: /interested in/i })).toHaveValue("Borrowing");
    expect(within(form).getByRole("checkbox", { name: /I consent to Pareto/i })).toBeRequired();
    expect(within(form).getByRole("button", { name: "Send enquiry" })).toHaveAttribute("type", "submit");
    expect(screen.queryByRole("link", { name: "Talk to us" })).not.toBeInTheDocument();
  });

  it("routes Originators enquiries to its local form without losing entered details", async () => {
    render(<PersonaPage id="originators" />);
    const name = screen.getByRole("textbox", { name: /full name/i });
    const interest = screen.getByRole("combobox", { name: /interested in/i });
    fireEvent.change(name, { target: { value: "Alex Example" } });
    fireEvent.change(interest, { target: { value: "Lending" } });
    const cta = screen.getByRole("link", { name: "Discuss your facility" });
    expect(cta).toHaveAttribute("href", "/originators#contact");
    fireEvent.click(cta);
    expect(interest).toHaveValue("Borrowing");
    expect(name).toHaveValue("Alex Example");
    expect(scrollToSection).toHaveBeenCalledWith("contact");
    await waitFor(() => expect(interest).toHaveFocus());
    expect(consumePendingContactInterest()).toBeNull();
  });

  it("gives capital allocators a local enquiry form with the risk disclosure", () => {
    render(<PersonaPage id="capital-providers" />);
    const page = personaPages.find((page) => page.id === "capital-providers")!;
    const form = screen.getByRole("form", { name: page.closing.title });
    expect(within(form).getByRole("combobox", { name: /interested in/i })).toHaveValue("Lending");
    expect(within(form).getByRole("button", { name: "Send enquiry" })).toHaveAttribute("type", "submit");
    expect(form).toHaveAccessibleDescription(page.disclaimer!);
    expect(within(screen.getByRole("region", { name: page.closing.title })).getByText(page.disclaimer!)).toBeVisible();
  });

  it("keeps allocator enquiries and entered details on the Capital Allocators page", async () => {
    render(<PersonaPage id="capital-providers" />);
    const organization = screen.getByRole("textbox", { name: /organization/i });
    const interest = screen.getByRole("combobox", { name: /interested in/i });
    fireEvent.change(organization, { target: { value: "Example Fund" } });
    fireEvent.change(interest, { target: { value: "Borrowing" } });
    const cta = screen.getByRole("link", { name: "Discuss your allocation" });
    expect(cta).toHaveAttribute("href", "/capital-providers#contact");
    fireEvent.click(cta);
    expect(interest).toHaveValue("Lending");
    expect(organization).toHaveValue("Example Fund");
    expect(scrollToSection).toHaveBeenCalledWith("contact");
    await waitFor(() => expect(interest).toHaveFocus());
    expect(consumePendingContactInterest()).toBeNull();
  });

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
        screen.getByRole("heading", { name: "Credit in practice" })
      ).toBeInTheDocument();
    }
  );

  it.each(["originators", "capital-providers"] as const)(
    "shows the published stories first and FalconX coming soon for %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const stories = screen.getByRole("region", {
        name: "Credit in practice",
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
