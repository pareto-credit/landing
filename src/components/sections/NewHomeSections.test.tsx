import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME } from "../../data/brand";
import { creditStructures } from "../../data/structures";
import { CONTACT_INTEREST_EVENT } from "../../lib/siteNavigation";
import AgentsSection from "./AgentsSection";
import PlansSection from "./PlansSection";
import StructuresSection from "./StructuresSection";
import StudioShowcaseSection from "./StudioShowcaseSection";
import UnderwritingSection from "./UnderwritingSection";

vi.mock("../../lib/scrollToSection", () => ({
  scrollToSection: vi.fn(),
}));

beforeAll(() => {
  // framer-motion's whileInView needs IntersectionObserver, which jsdom lacks.
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

const captureContactInterests = () => {
  const interests: unknown[] = [];
  const listener = (event: Event) => interests.push((event as CustomEvent).detail);
  window.addEventListener(CONTACT_INTEREST_EVENT, listener);
  return {
    interests,
    stop: () => window.removeEventListener(CONTACT_INTEREST_EVENT, listener),
  };
};

describe("UnderwritingSection", () => {
  it("presents Pareto as underwriting infrastructure with three pillars", () => {
    render(<UnderwritingSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Credit infrastructure built for regulated capital.",
    );
    const pillars = within(screen.getByTestId("underwriting-pillars")).getAllByRole("article");
    expect(pillars).toHaveLength(3);
    expect(screen.getByText("Diligence before listing.")).toBeInTheDocument();
    expect(screen.getByText("Built-in, per facility")).toBeInTheDocument();
    expect(screen.queryByText(/§/)).not.toBeInTheDocument();
    expect(screen.getByText(/pareto provides credit underwriting infrastructure/i)).toBeInTheDocument();
    expect(screen.queryByText("Keyring")).not.toBeInTheDocument();
    expect(screen.getByText("Ring-fenced facilities.")).toBeInTheDocument();
    expect(screen.getByText("Continuous monitoring.")).toBeInTheDocument();
  });
});

describe("StudioShowcaseSection", () => {
  afterEach(() => vi.clearAllMocks());

  it("switches the illustrative desk between personas", () => {
    render(<StudioShowcaseSection />);

    const desk = screen.getByTestId("studio-desk");
    expect(within(desk).getByText(/curator desk/i)).toBeInTheDocument();
    expect(screen.getByTestId("studio-overview")).toHaveTextContent(/structure, launch and run credit facilities/i);

    fireEvent.click(screen.getByRole("tab", { name: /borrow/i }));
    expect(screen.getByRole("tab", { name: /borrow/i })).toHaveAttribute("aria-selected", "true");
    expect(within(screen.getByTestId("studio-desk")).getByText(/borrower desk/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /allocate/i }));
    expect(within(screen.getByTestId("studio-desk")).getByText(/lender desk/i)).toBeInTheDocument();
  });

  it("labels the desk as illustrative and links to the ecosystem page", () => {
    render(<StudioShowcaseSection />);

    expect(within(screen.getByTestId("studio-desk")).getByText("Illustrative")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see the ecosystem/i })).toHaveAttribute("href", "/ecosystem");
  });

  it("pre-selects Studio access in the contact form", () => {
    const capture = captureContactInterests();
    render(<StudioShowcaseSection />);

    fireEvent.click(screen.getByRole("button", { name: /request studio access/i }));

    expect(capture.interests).toEqual(["Pareto Studio (Core)"]);
    capture.stop();
  });
});

describe("StructuresSection", () => {
  it("lists every supported structure, including revolving lines", () => {
    render(<StructuresSection />);

    const list = screen.getByTestId("structures-list");
    expect(within(list).getAllByRole("button")).toHaveLength(creditStructures.length);
    expect(screen.getByText("Revolving credit lines")).toBeInTheDocument();
  });

  it("morphs a structure card into a detail dialog and back", async () => {
    render(<StructuresSection />);

    const card = screen.getByRole("button", { name: /revolving credit lines: show details/i });
    fireEvent.click(card);

    const dialog = screen.getByRole("dialog", { name: "Revolving credit lines" });
    expect(within(dialog).getByText("Undrawn capital")).toBeInTheDocument();
    expect(card).toHaveClass("invisible");
    expect(document.body.style.overflow).toBe("hidden");

    // The exit morph is verified in a real browser; jsdom can't run layout animations.
    fireEvent.keyDown(window, { key: "Escape" });

    expect(card).not.toHaveClass("invisible");
    expect(document.body.style.overflow).toBe("");
  });

  it("routes the detail CTA to the contact form", () => {
    const capture = captureContactInterests();
    render(<StructuresSection />);

    fireEvent.click(screen.getByRole("button", { name: /term facilities: show details/i }));
    fireEvent.click(screen.getByRole("button", { name: /discuss this structure/i }));

    expect(capture.interests).toEqual(["Borrowing"]);
    capture.stop();
  });
});

describe("AgentsSection", () => {
  it("sequences MCP first, then signed actions, then the AI agent", () => {
    render(<AgentsSection />);

    const headings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(headings).toEqual([MCP_PRODUCT_NAME, "Agent-prepared actions", AI_PRODUCT_NAME]);
    expect(screen.getByText("Early access")).toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
    expect(screen.getByTestId("agent-session")).toHaveTextContent(/read-only tools/i);
  });

  it("routes the early-access CTA to the contact form", () => {
    const capture = captureContactInterests();
    render(<AgentsSection />);

    fireEvent.click(screen.getByRole("button", { name: /^join early access$/i }));

    expect(capture.interests).toEqual([`${MCP_PRODUCT_NAME} early access`]);
    capture.stop();
  });
});

describe("PlansSection", () => {
  it("renders Core, Pro and White-Glove with inherited features", () => {
    render(<PlansSection />);

    expect(within(screen.getByTestId("plan-core")).getByText("Core")).toBeInTheDocument();
    expect(within(screen.getByTestId("plan-pro")).getByText("Everything in Core, plus:")).toBeInTheDocument();
    const whiteGlove = screen.getByTestId("plan-white-glove");
    expect(within(whiteGlove).getByText("by NorthBridge")).toBeInTheDocument();
    expect(within(whiteGlove).getByText("Everything in Pro, plus:")).toBeInTheDocument();
    expect(within(screen.getByTestId("plan-core")).getByText(`${AI_PRODUCT_NAME} credit assessment`)).toBeInTheDocument();
  });

  it("shows one plan at a time on mobile via tabs", () => {
    render(<PlansSection />);

    expect(screen.getByTestId("plan-core")).toHaveClass("flex");
    expect(screen.getByTestId("plan-pro")).toHaveClass("hidden", "lg:flex");

    fireEvent.click(screen.getByRole("tab", { name: "Pro" }));

    expect(screen.getByTestId("plan-pro")).toHaveClass("flex");
    expect(screen.getByTestId("plan-core")).toHaveClass("hidden", "lg:flex");
  });

  it("pre-selects the matching plan in the contact form", () => {
    const capture = captureContactInterests();
    render(<PlansSection />);

    fireEvent.click(screen.getByRole("button", { name: /talk to northbridge/i }));

    expect(capture.interests).toEqual(["White-Glove by NorthBridge"]);
    capture.stop();
  });
});
