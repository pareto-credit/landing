import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProductPage from "./ProductPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer /> }));
vi.mock("framer-motion", async (original) => ({
  ...(await original<typeof import("framer-motion")>()),
  useReducedMotion: () => true,
  useInView: () => true,
}));

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("dedicated product pages", () => {
  it("lets Studio visitors explore functions inside the mockup without scrolling the page", () => {
    const { container } = render(<ProductPage id="studio" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Pareto Studio" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Every facility. One operating environment.",
      })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: /^request access/i }));
    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Pareto Studio (Core)");

    const tour = screen.getByRole("region", {
      name: "Interactive Studio walkthrough",
    });
    const startingHash = window.location.hash;
    vi.mocked(window.scrollTo).mockClear();
    expect(within(tour).queryByRole("link")).not.toBeInTheDocument();
    for (const label of [
      "Facility structuring",
      "Connected operations",
      "Participant views",
      "Reporting & visibility",
    ]) {
      const hotspot = within(tour).getByRole("button", {
        name: `Explore ${label.toLowerCase()}`,
      });
      fireEvent.click(hotspot);
      expect(hotspot).toHaveAttribute("aria-pressed", "true");
      const preview = within(tour).getByRole("img", {
        name: `${label} preview`,
      });
      expect(preview).toHaveAttribute(
        "id",
        hotspot.getAttribute("aria-controls")
      );
      expect(preview.querySelector("[inert]")).toBeInTheDocument();
      expect(within(preview).queryByRole("button")).not.toBeInTheDocument();
    }
    fireEvent.click(
      within(tour).getByRole("button", { name: "Workspace overview" })
    );
    expect(
      within(tour).getByRole("img", { name: "Workspace overview preview" })
    ).toBeInTheDocument();
    expect(window.location.hash).toBe(startingHash);
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("tablist", { name: "Studio desks" })
    ).not.toBeInTheDocument();
    expect(
      container.querySelectorAll(".studio-product-capabilities__grid > article")
    ).toHaveLength(4);
  });

  it.each(["credit-vaults", "studio"] as const)(
    "gives %s pricing, practical answers and a working local contact form",
    (id) => {
      const { container } = render(<ProductPage id={id} />);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(container.querySelectorAll("video")).toHaveLength(0);
      expect(container.querySelectorAll("#pricing")).toHaveLength(1);
      expect(container.querySelectorAll("#agents")).toHaveLength(1);
      expect(container.querySelectorAll("#contact")).toHaveLength(1);
      const faq = container.querySelector("#questions") as HTMLElement;
      const answers = within(faq).getAllByRole("button");
      expect(answers).toHaveLength(7);
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
      const collateral = within(faq).getByRole("button", { name: "Does Pareto only support unsecured lending?" });
      fireEvent.click(collateral);
      const answer = document.getElementById(collateral.getAttribute("aria-controls")!)!;
      expect(answer).toHaveAttribute("aria-hidden", "false");
      expect(answer).toHaveTextContent("secured and unsecured");
      expect(answer).toHaveTextContent("qualified custodians");
      expect(answer).toHaveTextContent("warehouse financing and revenue-based financing");
      expect(container.querySelector("form")).toHaveAttribute(
        "action",
        "https://formspree.io/f/xkgjlnwg"
      );
      const select = screen.getByRole("combobox", { name: /interested in/i });
      expect(select).toHaveValue(
        id === "studio" ? "Pareto Studio (Core)" : "Borrowing"
      );
      fireEvent.click(
        within(screen.getByTestId("plan-pro")).getByRole("button", {
          name: /^talk to us/i,
        })
      );
      expect(select).toHaveValue("Pro plan");
      const ids = Array.from(container.querySelectorAll("[id]")).map(
        (node) => node.id
      );
      expect(new Set(ids).size).toBe(ids.length);
    }
  );

  it("replaces the complete facility configuration when a visitor chooses a template", () => {
    const { container } = render(<ProductPage id="credit-vaults" />);
    const group = screen.getByRole("group", {
      name: "Facility templates",
    });
    const diagram = screen.getByRole("group", {
      name: "Credit Vault configuration",
    });
    for (const label of ["Prime brokerage", "Revolving facility", "NAV-based pricing", "DeFi adapters", "OTC desk", "Legal & compliance"]) {
      expect(diagram).toHaveAccessibleDescription(new RegExp(label, "i"));
    }
    expect(diagram).toHaveTextContent("Morpho · Aave · Pendle");
    const credit = within(group).getByRole("button", {
      name: "Working capital",
    });
    fireEvent.focus(credit);
    expect(credit).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(credit);
    expect(credit).toHaveAttribute("aria-pressed", "true");
    expect(diagram).toHaveAccessibleDescription(
      /Working capital.*Term facility.*Interest paid each cycle/i
    );
    expect(diagram).not.toHaveAccessibleDescription(
      /Revolving facility|NAV-based pricing|OTC desk/i
    );
    expect(
      within(group).getAllByRole("button", { pressed: true })
    ).toHaveLength(1);
    expect(
      screen.queryByRole("group", { name: "Facility design options" })
    ).not.toBeInTheDocument();
    expect(
      container.querySelectorAll(".product-scroll-highlight")
    ).toHaveLength(1);
    expect(
      container.querySelector(".product-scroll-highlight")
    ).toHaveTextContent(/^Different businesses/);
  });

  it("switches every template in place without navigating or scrolling", () => {
    render(<ProductPage id="credit-vaults" />);
    const group = screen.getByRole("group", { name: "Facility templates" });
    const diagram = screen.getByRole("group", {
      name: "Credit Vault configuration",
    });
    const startingHash = window.location.hash;
    vi.mocked(window.scrollTo).mockClear();
    for (const template of within(group).getAllByRole("button")) {
      fireEvent.click(template);
      expect(diagram).toHaveAccessibleDescription(
        new RegExp(
          template.querySelector("span:nth-child(2)")!.textContent!,
          "i"
        )
      );
    }
    expect(window.location.hash).toBe(startingHash);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("gives Credit Vaults the same agent workflow as Studio with a working early-access inquiry", () => {
    render(<ProductPage id="credit-vaults" />);
    expect(screen.getByText("Agent-prepared actions")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByTestId("agent-session")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /join early access/i }));
    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Pareto MCP early access");
  });

  it("lets visitors customize individual modules and restore a template", () => {
    render(<ProductPage id="credit-vaults" />);
    const diagram = screen.getByRole("group", { name: "Credit Vault configuration" });
    const templates = screen.getByRole("group", { name: "Facility templates" });
    expect(within(diagram).getAllByRole("checkbox")).toHaveLength(18);
    const groups = within(diagram).getAllByRole("group");
    expect(groups).toHaveLength(6);
    for (const group of groups) {
      expect(within(group).getAllByRole("checkbox")).toHaveLength(3);
    }
    expect(within(diagram).getByRole("group", { name: "Collateral & custody" })).toHaveTextContent("Onchain collateral");
    expect(within(diagram).getByRole("group", { name: "Covenant monitoring" })).toHaveTextContent("Breach & cure tracking");
    const otc = within(diagram).getByRole("checkbox", { name: "OTC desk" });
    const tranches = within(diagram).getByRole("checkbox", { name: "Senior / junior" });

    expect(otc).toBeChecked();
    expect(otc).toHaveAccessibleDescription("Execution & settlement integration");
    expect(tranches).not.toBeChecked();
    fireEvent.click(otc);
    expect(otc).not.toBeChecked();
    expect(diagram).toHaveAccessibleDescription(/Custom configuration/);
    expect(diagram).not.toHaveAccessibleDescription(/OTC desk/);
    expect(within(templates).queryAllByRole("button", { pressed: true })).toHaveLength(0);
    fireEvent.click(tranches);
    expect(tranches).toBeChecked();
    expect(diagram).toHaveAccessibleDescription(/Senior \/ junior/);

    fireEvent.click(within(templates).getByRole("button", { name: "Prime brokerage" }));
    expect(otc).toBeChecked();
    expect(tranches).not.toBeChecked();
    expect(diagram).toHaveAccessibleDescription(/Prime brokerage/);
    expect(diagram).not.toHaveAccessibleDescription(/Custom configuration/);
  });

  it("supports Space and Enter on a focused module without losing keyboard focus", () => {
    render(<ProductPage id="credit-vaults" />);
    const otc = screen.getByRole("checkbox", { name: "OTC desk" });
    otc.focus();
    fireEvent.keyDown(otc, { key: " " });
    expect(otc).not.toBeChecked();
    expect(otc).toHaveFocus();
    fireEvent.keyDown(otc, { key: " ", repeat: true });
    expect(otc).not.toBeChecked();
    fireEvent.keyDown(otc, { key: "Enter" });
    expect(otc).toBeChecked();
    expect(otc).toHaveFocus();
    fireEvent.keyDown(otc, { key: "Tab" });
    expect(otc).toBeChecked();
  });

  it("keeps all six groups available on mobile while customizing a group or restoring a template", () => {
    vi.stubGlobal("innerWidth", 390);
    render(<ProductPage id="credit-vaults" />);
    const diagram = screen.getByRole("group", { name: "Credit Vault configuration" });
    expect(within(diagram).getAllByRole("button")).toHaveLength(6);
    fireEvent.click(within(diagram).getByRole("button", { name: /Collateral & custody/ }));
    const collateral = within(diagram).getByRole("group", { name: "Collateral & custody" });
    const onchain = within(collateral).getByRole("checkbox", { name: /Onchain collateral/ });
    expect(onchain).toBeChecked();
    fireEvent.click(onchain);
    expect(onchain).not.toBeChecked();
    const template = screen.getByRole("combobox", { name: "Example template" });
    expect(template).toHaveValue("custom");
    fireEvent.change(template, { target: { value: "working-capital" } });
    expect(template).toHaveValue("working-capital");
    expect(within(collateral).getAllByRole("checkbox").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
    fireEvent.click(within(diagram).getByRole("button", { name: /Covenant monitoring/ }));
    expect(within(diagram).getByRole("checkbox", { name: /Financial covenants/ })).toBeChecked();
  });
});
