import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import StudioShowcaseSection from "../StudioShowcaseSection";
import StudioPreview from "./StudioPreview";
import StudioFeatureTour from "../product/StudioFeatureTour";

class PreviewObserver {
  static observers: PreviewObserver[] = [];
  targets = new Set<Element>();
  private callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    PreviewObserver.observers.push(this);
  }
  observe(target: Element) {
    this.targets.add(target);
  }
  unobserve(target: Element) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
  }
  static emit(target: Element, isIntersecting: boolean) {
    for (const observer of this.observers) {
      if (observer.targets.has(target))
        observer.callback(
          [{ target, isIntersecting } as IntersectionObserverEntry],
          observer as unknown as IntersectionObserver
        );
    }
  }
}

const settings = vi.hoisted(() => ({ reduced: false }));
vi.mock("framer-motion", async (importOriginal) => ({
  ...(await importOriginal<typeof import("framer-motion")>()),
  useReducedMotion: () => settings.reduced,
}));
const advance = (ms = 2600) => act(() => vi.advanceTimersByTime(ms));
const completeSequence = () => {
  advance();
  advance();
  advance();
  advance(3200);
};
const visiblePreview = () => {
  const view = render(<StudioShowcaseSection />);
  const preview = screen.getByRole("region", {
    name: "Animated product preview",
  });
  act(() => PreviewObserver.emit(preview, true));
  return { ...view, preview };
};
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IntersectionObserver", PreviewObserver);
  settings.reduced = false;
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  PreviewObserver.observers = [];
});

describe("Studio preview playback and exploration", () => {
  it("keeps all five view controls inside the walkthrough when the screen changes", () => {
    render(<StudioFeatureTour />);
    const tour = screen.getByRole("region", { name: "Interactive Studio walkthrough" });
    const controls = within(tour).getByRole("group", { name: "Explore Studio functionality" });
    const buttons = within(controls).getAllByRole("button");
    expect(buttons).toHaveLength(5);
    const participants = within(controls).getByRole("button", { name: "Explore participant views" });
    fireEvent.click(participants);
    const preview = within(tour).getByRole("img", { name: "Participant views preview" });
    expect(participants).toHaveAttribute("aria-pressed", "true");
    for (const button of buttons) {
      expect(controls).toContainElement(button);
      expect(button).toHaveAttribute("aria-controls", preview.id);
      expect(button.closest("[inert]")).toBeNull();
    }
  });

  it("retains the operating queue when moving between native workspace pages", () => {
    render(<StudioFeatureTour />);
    const tour = screen.getByRole("region", {
      name: "Interactive Studio walkthrough",
    });
    act(() => PreviewObserver.emit(tour, true));
    fireEvent.click(
      screen.getByRole("button", { name: "Explore connected operations" })
    );
    advance();
    expect(screen.getByText("12,500,000 USDC")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore participant views" })
    );
    advance(5000);
    fireEvent.click(
      screen.getByRole("button", { name: "Explore connected operations" })
    );
    expect(screen.getByText("12,500,000 USDC")).toBeInTheDocument();
    advance();
    expect(screen.getByText("8,500,000 USDC")).toBeInTheDocument();
  });

  it("keeps an explored function selected and returns on Escape without moving focus", () => {
    render(<StudioFeatureTour />);
    const tour = screen.getByRole("region", {
      name: "Interactive Studio walkthrough",
    });
    act(() => PreviewObserver.emit(tour, true));
    const hotspot = screen.getByRole("button", {
      name: "Explore connected operations",
    });
    act(() => hotspot.focus());
    fireEvent.click(hotspot);
    advance(40000);
    expect(
      screen.getByRole("img", { name: "Connected operations preview" })
    ).toBeInTheDocument();
    expect(hotspot).toHaveFocus();
    fireEvent.keyDown(hotspot, { key: "Escape" });
    expect(
      screen.getByRole("img", { name: "Workspace overview preview" })
    ).toBeInTheDocument();
    expect(hotspot).toHaveFocus();
    expect(hotspot).toHaveAttribute("aria-pressed", "false");
  });

  it("loops between underwriters and borrowers in the inert guided preview", () => {
    render(<StudioPreview mode="guided" />);
    const preview = screen.getByRole("img", {
      name: /animated studio workspace/i,
    });
    expect(preview.querySelector("[inert]")).toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    act(() => PreviewObserver.emit(preview, true));
    completeSequence();
    expect(screen.getByTestId("studio-desk")).toHaveAttribute(
      "data-persona",
      "borrow"
    );
    completeSequence();
    expect(screen.getByTestId("studio-desk")).toHaveAttribute(
      "data-persona",
      "underwrite"
    );
  });

  it("completes underwriter, borrower and lender sequences in order, then loops", () => {
    visiblePreview();
    const underwriter = screen.getByRole("tab", { name: /Underwriters/i });
    const borrower = screen.getByRole("tab", { name: /Borrowers/i });
    const lender = screen.getByRole("tab", { name: /Lenders/i });
    screen.getByRole("button", { name: /Request Studio access/i }).focus();
    advance();
    advance();
    advance();
    expect(underwriter).toHaveAttribute("aria-selected", "true");
    advance(3199);
    expect(underwriter).toHaveAttribute("aria-selected", "true");
    advance(1);
    expect(borrower).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText("$248,600,000", { selector: ".preview-number__target" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Request Studio access/i })
    ).toHaveFocus();
    completeSequence();
    expect(lender).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("button", { name: /ask a question/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enter app/i })).toHaveAttribute(
      "href",
      "https://app.pareto.credit/"
    );
    completeSequence();
    expect(underwriter).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("12,500,000 USDC")).not.toBeInTheDocument();
  });

  it("only advances while the product itself is visible", () => {
    const { container } = render(<StudioShowcaseSection />);
    act(() => PreviewObserver.emit(container.querySelector("#studio")!, true));
    advance(10000);
    expect(screen.queryByText("12,500,000 USDC")).not.toBeInTheDocument();
    const preview = screen.getByRole("region", {
      name: "Animated product preview",
    });
    act(() => PreviewObserver.emit(preview, true));
    advance();
    expect(screen.getByText("12,500,000 USDC")).toBeInTheDocument();
    act(() => PreviewObserver.emit(preview, false));
    advance(10000);
    expect(screen.queryByText("8,500,000 USDC")).not.toBeInTheDocument();
    act(() => PreviewObserver.emit(preview, true));
    advance();
    expect(screen.getByText("8,500,000 USDC")).toBeInTheDocument();
  });

  it("starts a fresh sequence after direct role selection", () => {
    visiblePreview();
    advance();
    fireEvent.click(screen.getByRole("tab", { name: /Borrowers/i }));
    expect(screen.queryByText("12,500,000 USDC")).not.toBeInTheDocument();
    expect(
      screen.getByText("$248,600,000", { selector: ".preview-number__target" })
    ).toBeInTheDocument();
    completeSequence();
    expect(screen.getByRole("tab", { name: /Lenders/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("keeps a focused table mounted until the visitor leaves the preview", () => {
    visiblePreview();
    advance();
    advance();
    advance();
    const requests = screen.getByRole("region", { name: "Preview requests" });
    act(() => requests.focus());
    advance(12000);
    expect(requests).toHaveFocus();
    expect(screen.getByRole("tab", { name: /Underwriters/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    act(() =>
      screen.getByRole("button", { name: /Request Studio access/i }).focus()
    );
    advance(3200);
    expect(screen.getByRole("tab", { name: /Borrowers/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("lets entrance motion finish while early allocation focus pauses incoming events", () => {
    const { preview } = visiblePreview();
    fireEvent.click(screen.getByRole("tab", { name: /Lenders/i }));
    const allocation = screen.getByRole("region", { name: "Allocation" });
    act(() => allocation.focus());
    const desk = screen.getByTestId("studio-desk");
    expect(desk).toHaveAttribute("data-playing", "false");
    expect(desk).toHaveAttribute("data-motion-running", "true");
    advance(5000);
    expect(
      screen.queryByText("Borrower report available")
    ).not.toBeInTheDocument();
    expect(allocation).toHaveFocus();
    act(() => PreviewObserver.emit(preview, false));
    expect(desk).toHaveAttribute("data-motion-running", "false");
    act(() => PreviewObserver.emit(preview, true));
    expect(desk).toHaveAttribute("data-motion-running", "true");
    expect(desk).toHaveAttribute("data-playing", "false");
    act(() => screen.getByRole("button", { name: /Ask a question/i }).focus());
    advance();
    expect(screen.getByText("Borrower report available")).toBeInTheDocument();
  });

  it("keeps reduced-motion previews static with direct role selection available", () => {
    settings.reduced = true;
    visiblePreview();
    advance(40000);
    expect(screen.getByRole("tab", { name: /Underwriters/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    fireEvent.click(screen.getByRole("tab", { name: /Borrowers/i }));
    advance(40000);
    expect(screen.getByRole("tab", { name: /Borrowers/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(
      screen.getByText("$248,600,000", { selector: ".preview-number__target" })
    ).toBeInTheDocument();
  });
});
