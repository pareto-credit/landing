import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME } from "../../data/brand";
import { creditStructures } from "../../data/structures";
import { CONTACT_INTEREST_EVENT } from "../../lib/siteNavigation";
import AgentsSection from "./AgentsSection";
import ContactSection from "./ContactSection";
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
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", ResizeObserverStub);
});

const captureContactInterests = () => {
  const interests: unknown[] = [];
  const listener = (event: Event) =>
    interests.push((event as CustomEvent).detail);
  window.addEventListener(CONTACT_INTEREST_EVENT, listener);
  return {
    interests,
    stop: () => window.removeEventListener(CONTACT_INTEREST_EVENT, listener),
  };
};

describe("UnderwritingSection", () => {
  it("explains three collateral arrangements with keyboard-accessible cards", () => {
    render(<UnderwritingSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Credit infrastructure across the collateral spectrum."
    );
    const pillars = within(screen.getByTestId("underwriting-pillars")).getAllByRole("article");
    expect(pillars).toHaveLength(3);
    for (const title of ["Onchain collateral", "Custodian-held collateral", "Receivables & loan portfolios"]) {
      const card = screen.getByRole("article", { name: title });
      card.focus();
      expect(card).toHaveFocus();
    }
    expect(screen.getByText(/configure LTV thresholds, margin calls, collateral top-ups and grace periods/i)).toBeInTheDocument();
    expect(screen.getByText(/facility agreements connect those offchain arrangements to the onchain Credit Vault/i)).toBeInTheDocument();
    expect(screen.getByText(/asset-backed and warehouse financing/i)).toBeInTheDocument();
  });
});

describe("StudioShowcaseSection", () => {
  afterEach(() => vi.clearAllMocks());

  it("switches the illustrative desk between personas", () => {
    render(<StudioShowcaseSection />);

    const desk = screen.getByTestId("studio-desk");
    expect(within(desk).getByText(/curator desk/i)).toBeInTheDocument();
    expect(screen.getByTestId("studio-overview")).toHaveTextContent(
      /structure, launch and run credit facilities/i
    );

    fireEvent.click(screen.getByRole("tab", { name: /borrow/i }));
    expect(screen.getByRole("tab", { name: /borrow/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(
      within(screen.getByTestId("studio-desk")).getByText(/borrower desk/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /lenders/i }));
    expect(
      within(screen.getByTestId("studio-desk")).getByText(/lender desk/i)
    ).toBeInTheDocument();
  });

  it("labels the desk as illustrative and links to the ecosystem page", () => {
    render(<StudioShowcaseSection />);

    expect(
      within(screen.getByTestId("studio-desk")).getByText("Illustrative")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /for originators/i })
    ).toHaveAttribute("href", "/originators");
  });

  it("pre-selects Studio access in the contact form", () => {
    const capture = captureContactInterests();
    render(<StudioShowcaseSection />);

    fireEvent.click(
      screen.getByRole("button", { name: /request studio access/i })
    );

    expect(capture.interests).toEqual(["Pareto Studio (Core)"]);
    capture.stop();
  });
});

describe("StructuresSection", () => {
  it("moves focus to the contact form when discussing a structure", async () => {
    render(
      <>
        <StructuresSection />
        <ContactSection />
      </>
    );
    fireEvent.click(
      screen.getByRole("button", { name: /term facilities: show details/i })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /discuss this structure/i })
    );
    const interest = screen.getByRole("combobox", { name: /interested in/i });
    expect(interest).toHaveValue("Borrowing");
    await waitFor(() => expect(interest).toHaveFocus());
  });

  it("isolates the dialog from the page and restores focus when closed", async () => {
    const { container } = render(<StructuresSection />);
    const card = screen.getByRole("button", {
      name: /term facilities: show details/i,
    });
    card.focus();
    fireEvent.click(card);

    const dialog = screen.getByRole("dialog", { name: "Term facilities" });
    expect(container).not.toContainElement(dialog);
    expect(container.inert).toBe(true);
    const close = within(dialog).getByRole("button", {
      name: /close details/i,
    });
    const cta = within(dialog).getByRole("button", {
      name: /discuss this structure/i,
    });
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(cta).toHaveFocus();
    fireEvent.keyDown(cta, { key: "Tab" });
    expect(close).toHaveFocus();

    fireEvent.click(close);
    await waitFor(() => expect(container.inert).not.toBe(true));
    expect(card).toHaveFocus();
  });

  it("lists every supported structure, including revolving lines", () => {
    render(<StructuresSection />);

    const list = screen.getByTestId("structures-list");
    expect(within(list).getAllByRole("button")).toHaveLength(
      creditStructures.length
    );
    expect(screen.getByText("Revolving credit lines")).toBeInTheDocument();
  });

  it("morphs a structure card into a detail dialog and back", async () => {
    render(<StructuresSection />);

    const card = screen.getByRole("button", {
      name: /revolving credit lines: show details/i,
    });
    fireEvent.click(card);

    const dialog = screen.getByRole("dialog", {
      name: "Revolving credit lines",
    });
    expect(within(dialog).getByText("Undrawn capital")).toBeInTheDocument();
    expect(
      within(dialog).getByRole("img", {
        name: /drawing increases the balance, repayment reduces it/i,
      })
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Credit limit")).toBeInTheDocument();
    expect(within(dialog).getByText("Redraw")).toBeInTheDocument();
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

    fireEvent.click(
      screen.getByRole("button", { name: /term facilities: show details/i })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /discuss this structure/i })
    );

    expect(capture.interests).toEqual(["Borrowing"]);
    capture.stop();
  });
});

describe("AgentsSection", () => {
  it("sequences MCP first, then signed actions, then the AI agent", () => {
    render(<AgentsSection variant="studio" />);

    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(headings).toEqual([
      MCP_PRODUCT_NAME,
      "Agent-prepared actions",
      AI_PRODUCT_NAME,
    ]);
    expect(screen.getByText("Early access")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByTestId("agent-session")).toHaveTextContent(
      /read-only tools/i
    );
  });

  it("pairs concise agent capabilities with the full MCP session and inline availability chips", () => {
    render(<AgentsSection />);
    const names = screen.getAllByRole("term");
    expect(names.map((name) => name.textContent)).toEqual([
      `${MCP_PRODUCT_NAME} Early access`,
      "Pareto Agents Upcoming",
      `${AI_PRODUCT_NAME} Beta`,
    ]);
    expect(screen.getByTestId("agent-session")).toHaveTextContent(
      /read-only tools/i
    );
    expect(
      screen.queryByRole("link", { name: /agents for/i })
    ).not.toBeInTheDocument();
  });

  it("routes the early-access CTA to the contact form", () => {
    const capture = captureContactInterests();
    render(<AgentsSection />);

    fireEvent.click(
      screen.getByRole("button", { name: /^join early access$/i })
    );

    expect(capture.interests).toEqual([`${MCP_PRODUCT_NAME} early access`]);
    capture.stop();
  });
});

describe("PlansSection", () => {
  it("renders Core, Pro and White-Glove with inherited features", () => {
    render(<PlansSection />);

    expect(
      within(screen.getByTestId("plan-core")).getByText("Core")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("plan-pro")).getByText(
        "Everything in Core, plus:"
      )
    ).toBeInTheDocument();
    const whiteGlove = screen.getByTestId("plan-white-glove");
    expect(within(whiteGlove).getByText("by NorthBridge")).toBeInTheDocument();
    expect(
      within(whiteGlove).getByText("Everything in Pro, plus:")
    ).toBeInTheDocument();
    expect(
      within(whiteGlove).getByRole("link", { name: /northbridge/i })
    ).toHaveAttribute("href", "https://northbridge.management/");
    expect(
      within(whiteGlove).getByRole("img", { name: "NorthBridge" })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("plan-pro")).getByText(
        `${AI_PRODUCT_NAME} credit assessment`
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("plan-core")).queryByText(
        `${AI_PRODUCT_NAME} credit assessment`
      )
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/keyring/i)).not.toBeInTheDocument();
  });

  it("shows one plan at a time on mobile via tabs", () => {
    render(<PlansSection />);

    expect(screen.getByTestId("plan-core")).toHaveClass("flex");
    expect(screen.getByTestId("plan-pro")).toHaveClass("hidden", "lg:flex");

    fireEvent.click(screen.getByRole("tab", { name: "Pro" }));

    expect(screen.getByTestId("plan-pro")).toHaveClass("flex");
    expect(screen.getByTestId("plan-core")).toHaveClass("hidden", "lg:flex");
  });

  it("supports keyboard selection and associates tabs with their panels", () => {
    render(<PlansSection />);
    const core = screen.getByRole("tab", { name: "Core" });
    core.focus();
    fireEvent.keyDown(core, { key: "ArrowRight" });
    const pro = screen.getByRole("tab", { name: "Pro" });
    expect(pro).toHaveFocus();
    expect(pro).toHaveAttribute("aria-selected", "true");
    expect(pro).toHaveAttribute(
      "aria-controls",
      screen.getByTestId("plan-pro").id
    );
    fireEvent.keyDown(pro, { key: "End" });
    expect(screen.getByRole("tab", { name: "White-Glove" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("tab", { name: "White-Glove" }), {
      key: "ArrowRight",
    });
    expect(core).toHaveFocus();
  });

  it("reveals tier descriptions on demand and dismisses them without losing the trigger", () => {
    render(<PlansSection />);
    const core = within(screen.getByTestId("plan-core"));
    const trigger = core.getByRole("button", { name: "How Core works" });
    const description = document.getElementById(
      trigger.getAttribute("aria-controls")!
    )!;
    expect(description).not.toBeVisible();
    expect(trigger).toHaveAttribute("aria-controls", description.id);

    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(description).toBeVisible();
    vi.useFakeTimers();
    try {
      fireEvent.pointerLeave(trigger);
      fireEvent.pointerEnter(description);
      act(() => vi.advanceTimersByTime(200));
      expect(description).toBeVisible();
      fireEvent.pointerLeave(description);
      act(() => vi.advanceTimersByTime(200));
      expect(description).not.toBeVisible();
    } finally {
      vi.useRealTimers();
    }
    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(description).not.toBeVisible();

    fireEvent.click(trigger);
    expect(description).toBeVisible();
    fireEvent.pointerDown(document.body);
    expect(description).not.toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("replaces covered features with accessible details and restores focus when closed", () => {
    render(<PlansSection />);
    const card = screen.getByTestId("plan-core");
    const trigger = within(card).getByRole("button", {
      name: "How Core works",
    });
    const body = card.querySelector(".offering-card__body")!;
    fireEvent.click(trigger);
    const overview = within(card).getByRole("region", {
      name: "Core overview",
    });
    expect(body).toHaveAttribute("inert");
    expect(body).toHaveAttribute("aria-hidden", "true");
    expect(
      within(overview).getByText(/your team sets the terms/i)
    ).toBeVisible();
    const action = within(overview).getByRole("button", {
      name: "Request access",
    });
    act(() => action.focus());
    fireEvent.keyDown(action, { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(overview).not.toBeVisible();
    expect(body).not.toHaveAttribute("inert");
    expect(body).not.toHaveAttribute("aria-hidden");
  });

  it("routes the overview CTA to the selected tier and closes on a mobile tab change", () => {
    const capture = captureContactInterests();
    render(<PlansSection />);
    const trigger = within(screen.getByTestId("plan-pro")).getByRole("button", {
      name: "How Pro works",
    });
    fireEvent.click(trigger);
    fireEvent.click(
      within(screen.getByRole("region", { name: "Pro overview" })).getByRole(
        "button",
        { name: "Talk to us" }
      )
    );
    expect(capture.interests).toEqual(["Pro plan"]);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("tab", { name: "Core" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    capture.stop();
  });

  it("keeps one explanation open even when the previous note was pinned", () => {
    render(<PlansSection />);
    const core = within(screen.getByTestId("plan-core")).getByRole("button", {
      name: "How Core works",
    });
    const pro = within(screen.getByTestId("plan-pro")).getByRole("button", {
      name: /about white-label/i,
    });
    fireEvent.click(core);
    expect(core).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerEnter(pro, { pointerType: "mouse" });
    expect(core).toHaveAttribute("aria-expanded", "false");
    expect(pro).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(core.getAttribute("aria-controls")!)
    ).not.toBeVisible();
    fireEvent.keyDown(pro, { key: "Escape" });
    expect(pro).toHaveAttribute("aria-expanded", "false");
  });

  it("explains white-label availability and curator risk within the relevant tiers", () => {
    render(<PlansSection />);
    const core = within(screen.getByTestId("plan-core"));
    const pro = within(screen.getByTestId("plan-pro"));
    const whiteGlove = within(screen.getByTestId("plan-white-glove"));
    expect(
      core.queryByRole("button", { name: /about white-label/i })
    ).not.toBeInTheDocument();

    const whiteLabel = pro.getByRole("button", { name: /about white-label/i });
    const availability = document.getElementById(
      whiteLabel.getAttribute("aria-controls")!
    )!;
    expect(availability).not.toBeVisible();
    fireEvent.click(whiteLabel);
    expect(whiteLabel).toHaveAttribute("aria-expanded", "true");
    expect(whiteLabel).toHaveAttribute("aria-controls", availability.id);
    expect(availability).toBeVisible();
    fireEvent.keyDown(whiteLabel, { key: "Escape" });
    expect(availability).not.toBeVisible();

    expect(
      whiteGlove.getByRole("button", { name: /about white-label/i })
    ).toBeInTheDocument();
    const curatorNote = whiteGlove.getByRole("button", {
      name: /about northbridge as named curator/i,
    });
    fireEvent.click(curatorNote);
    expect(
      document.getElementById(curatorNote.getAttribute("aria-controls")!)
    ).toHaveTextContent(
      /curation does not guarantee repayment; credit risk remains with lenders/i
    );
    expect(
      document.getElementById(curatorNote.getAttribute("aria-controls")!)
    ).toBeVisible();
  });

  it("pre-selects the matching plan in the contact form", () => {
    const capture = captureContactInterests();
    render(<PlansSection />);

    fireEvent.click(
      screen.getByRole("button", { name: /talk to northbridge/i })
    );

    expect(capture.interests).toEqual(["White-Glove by NorthBridge"]);
    capture.stop();
  });
});
