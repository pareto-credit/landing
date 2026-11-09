import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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
  it("reveals vault-specific details and hands off to the local enquiry form", async () => {
    render(<ProductPage id="credit-vaults" />);
    const configuration = "Custody evidence · monitoring · servicing";
    expect(screen.queryByText(configuration)).not.toBeInTheDocument();

    const term = screen.getByRole("button", { name: "Term facilities: show details" });
    expect(within(term).getByText("Lending cycle")).toBeInTheDocument();
    const custody = screen.getByRole("button", {
      name: "Custodial facilities: show details",
    });
    expect(custody).toHaveTextContent("Structure lending around assets held with a custodian.");

    const interest = screen.getByRole("combobox", { name: /interested in/i });
    fireEvent.change(interest, { target: { value: "Pro plan" } });
    fireEvent.click(custody);

    const dialog = screen.getByRole("dialog", { name: "Custodial facilities" });
    expect(within(dialog).getByText(configuration)).toBeInTheDocument();
    fireEvent.click(
      within(dialog).getByRole("button", { name: "Discuss this structure" })
    );

    expect(interest).toHaveValue("Borrowing");
    await waitFor(() => expect(interest).toHaveFocus());
  });

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
      if (id === "credit-vaults") {
        const hero = screen.getByRole("region", {
          name: "Credit vaults, on your terms.",
        });
        expect(
          within(hero).getByRole("link", { name: "Explore structures" })
        ).toHaveAttribute("href", "#facilities");
        fireEvent.click(
          within(hero).getByRole("link", { name: "Discuss your facility" })
        );
        expect(select).toHaveValue("Borrowing");
        expect(screen.getByRole("button", { name: "Send enquiry" })).toBeInTheDocument();
      }
      const ids = Array.from(container.querySelectorAll("[id]")).map(
        (node) => node.id
      );
      expect(new Set(ids).size).toBe(ids.length);
    }
  );



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




});
