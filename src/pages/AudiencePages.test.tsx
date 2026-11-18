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

  it("lets originators explore the vault anatomy with the keyboard", () => {
    render(<PersonaPage id="originators" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Financing built around your business"
    );
    const anatomy = screen.getByRole("region", { name: "Anatomy of a vault" });
    const tabs = within(anatomy).getByRole("tablist", {
      name: "Anatomy of a vault",
    });
    const intro = within(tabs).getByRole("tab", { name: "The vault" });
    expect(intro).toHaveAttribute("aria-selected", "true");
    const first = within(tabs).getByRole("tab", { name: "Deposits & shares" });
    const next = within(tabs).getByRole("tab", { name: "Credit facility" });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(next).toHaveFocus();
    expect(next).toHaveAttribute("aria-selected", "true");
    expect(
      within(anatomy).getByRole("tabpanel", { name: "Credit facility" })
    ).toHaveTextContent("How the borrower receives funding");
    fireEvent.keyDown(next, { key: "End" });
    expect(
      within(tabs).getByRole("tab", { name: "Full anatomy" })
    ).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(intro).toHaveFocus();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Ecosystem" })
    ).not.toBeInTheDocument();
  });

  it("links the allocator planes and their explanations", () => {
    render(<PersonaPage id="capital-providers" />);
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
  });

  it("opens the matching vault layer and settlement details on click", () => {
    render(<PersonaPage id="originators" />);
    const anatomy = screen.getByRole("region", { name: "Anatomy of a vault" });
    fireEvent.click(within(anatomy).getByRole("tab", { name: "Repayment & exit" }));
    const panel = within(anatomy).getByRole("tabpanel", { name: "Repayment & exit" });
    expect(panel).toHaveTextContent("Request, settlement and claim");
    const figure = anatomy.querySelector("figure")!;
    expect(figure).toHaveAttribute("aria-hidden", "true");
    expect(figure.querySelectorAll('svg [data-active="true"]')).toHaveLength(1);
    const states = Array.from(figure.querySelectorAll("[data-part]")).map(
      (layer) => [layer.getAttribute("data-part"), layer.getAttribute("data-state")]
    );
    expect(Object.fromEntries(states)).toEqual({
      deposit: "stowed",
      facility: "stowed",
      oversight: "stowed",
      value: "stowed",
      settlement: "open",
      reporting: "preview",
    });
  });

  it("previews a vault layer when its control is hovered", () => {
    render(<PersonaPage id="originators" />);
    const anatomy = screen.getByRole("region", { name: "Anatomy of a vault" });
    fireEvent.mouseEnter(within(anatomy).getByRole("tab", { name: "Share value" }));
    expect(anatomy.querySelector('[data-part="value"]')).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(
      within(anatomy).getByRole("tabpanel", { name: "Share value" })
    ).toBeVisible();
  });

  it("starts with the closed vault and steps through to the full anatomy", () => {
    render(<PersonaPage id="originators" />);
    const anatomy = screen.getByRole("region", { name: "Anatomy of a vault" });
    const stage = anatomy.querySelector("figure svg")!;
    const layerStates = () =>
      Array.from(stage.querySelectorAll("[data-part]")).map((layer) =>
        layer.getAttribute("data-state")
      );
    expect(stage).toHaveAttribute("data-view", "intro");
    expect(new Set(layerStates())).toEqual(new Set(["closed"]));
    expect(
      within(anatomy).getByRole("tabpanel", { name: "The vault" })
    ).toHaveTextContent("Follow capital from lender deposit");

    fireEvent.click(within(anatomy).getByRole("button", { name: "Open the vault" }));
    expect(stage).toHaveAttribute("data-view", "layer");
    expect(
      within(anatomy).getByRole("tab", { name: "Deposits & shares" })
    ).toHaveAttribute("aria-selected", "true");
    expect(stage.querySelector('[data-part="facility"]')).toHaveAttribute(
      "data-state",
      "preview"
    );
    fireEvent.click(
      within(anatomy).getByRole("button", { name: "Next: Credit facility" })
    );
    expect(
      within(anatomy).getByRole("tabpanel", { name: "Credit facility" })
    ).toBeVisible();

    fireEvent.click(within(anatomy).getByRole("tab", { name: "Share value" }));
    const step = within(anatomy).getByRole("button", { name: "Next: Repayment & exit" });
    step.focus();
    fireEvent.click(step);
    expect(
      within(anatomy).getByRole("button", { name: "Next: Records & reporting" })
    ).toHaveFocus();

    fireEvent.click(within(anatomy).getByRole("tab", { name: "Records & reporting" }));
    expect(
      within(anatomy).queryByRole("link", { name: "Discuss your facility" })
    ).not.toBeInTheDocument();
    const last = within(anatomy).getByRole("button", { name: "See the full anatomy" });
    last.focus();
    fireEvent.click(last);
    expect(stage).toHaveAttribute("data-view", "overview");
    expect(within(anatomy).getByRole("tab", { name: "Full anatomy" })).toHaveFocus();
    expect(
      within(anatomy).getByRole("link", { name: "Discuss your facility" })
    ).toBeVisible();
    expect(within(anatomy).queryByRole("button")).not.toBeInTheDocument();
    expect(new Set(layerStates())).toEqual(new Set(["spread"]));
    expect(
      within(anatomy).getByRole("tabpanel", { name: "Full anatomy" })
    ).toBeVisible();
    fireEvent.click(stage.querySelector('[data-part="oversight"]')!);
    expect(
      within(anatomy).getByRole("tab", { name: "Credit oversight" })
    ).toHaveAttribute("aria-selected", "true");
  });

  it("selects a part when its vault layer is clicked", () => {
    render(<PersonaPage id="originators" />);
    const anatomy = screen.getByRole("region", { name: "Anatomy of a vault" });
    fireEvent.click(within(anatomy).getByRole("tab", { name: "Share value" }));
    fireEvent.click(anatomy.querySelector('[data-part="facility"]')!);
    expect(
      within(anatomy).getByRole("tab", { name: "Credit facility" })
    ).toHaveAttribute("aria-selected", "true");
    expect(
      within(anatomy).getByRole("tabpanel", { name: "Credit facility" })
    ).toBeVisible();
  });

  it("selects a layer when its control receives keyboard focus", () => {
    render(<PersonaPage id="originators" />);
    const oversight = screen.getByRole("tab", { name: "Credit oversight" });
    fireEvent.focus(oversight);
    expect(oversight).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Credit oversight" })).toBeVisible();
  });

  it("keeps the focused vault explanation in place on pointer hover", () => {
    render(<PersonaPage id="originators" />);
    const panel = screen.getByRole("tabpanel", { name: "The vault" });
    panel.focus();
    const facility = screen.getByRole("tab", { name: "Credit facility" });
    fireEvent.mouseEnter(facility);
    expect(panel).toHaveFocus();
    expect(panel).toBeVisible();
    expect(facility).toHaveAttribute("aria-selected", "false");

    fireEvent.focus(facility);
    expect(facility).toHaveAttribute("aria-selected", "true");
  });

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
    fireEvent.click(screen.getByRole("tab", { name: "Full anatomy" }));
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

  it("gives capital allocators layers to evaluate", () => {
    render(<PersonaPage id="capital-providers" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A broader perspective on credit"
    );
    const tabs = screen.getByRole("tablist", {
      name: "Understand every layer",
    });
    fireEvent.click(within(tabs).getByRole("tab", { name: /servicing/i }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(personaPages.find((page) => page.id === "capital-providers")!.framework.items.find((layer) => layer.id === "servicing")!.detail);
    expect(screen.queryByTestId("studio-desk")).not.toBeInTheDocument();
    expect(
      screen.getByText(/lending involves credit risk/i)
    ).toBeInTheDocument();
  });

  it.each(["originators", "capital-providers"] as const)(
    "shows the selected layer explanation without an extra disclosure for %s",
    (id) => {
      render(<PersonaPage id={id} />);
      const [first, second] = personaPages.find((page) => page.id === id)!.framework.items;
      const panel = screen.getByRole("tabpanel", { name: first.title });
      expect(panel).toHaveTextContent(first.detail);
      expect(panel.querySelector("details")).toBeNull();
      expect(screen.queryByText("Explore this layer")).not.toBeInTheDocument();
      const tabs = screen.getByRole("tablist");
      fireEvent.click(within(tabs).getByRole("tab", { name: second.title }));
      expect(screen.getByRole("tabpanel", { name: second.title })).toHaveTextContent(second.detail);
      fireEvent.click(within(tabs).getByRole("tab", { name: first.title }));
      expect(screen.getByRole("tabpanel", { name: first.title })).toHaveTextContent(first.detail);
    }
  );

  it("keeps the active explanation in place while its CTA has keyboard focus", () => {
    render(<PersonaPage id="originators" />);
    fireEvent.click(screen.getByRole("tab", { name: "Full anatomy" }));
    const cta = screen.getByRole("link", { name: "Discuss your facility" });
    const panel = screen.getByRole("tabpanel", { name: "Full anatomy" });
    cta.focus();
    fireEvent.mouseEnter(screen.getByRole("tab", { name: "Credit facility" }));
    expect(cta).toHaveFocus();
    expect(panel).toBeVisible();
    fireEvent.click(cta);
    expect(screen.getByRole("combobox", { name: /interested in/i })).toHaveValue("Borrowing");
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
