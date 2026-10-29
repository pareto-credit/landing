import { act, fireEvent, render, screen } from "@testing-library/react";
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
  it("keeps guides in the frame when their sidebar target is clipped", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (
          this.classList.contains("studio-feature-tour") ||
          this.classList.contains("studio-feature-tour__screen") ||
          this.classList.contains("studio-preview-frame")
        )
          return new DOMRect(0, 0, 1200, 420);
        if (this.classList.contains("product-preview__sidebar"))
          return new DOMRect(5, 30, 164, 360);
        if (this.parentElement?.dataset.tourTarget)
          return new DOMRect(
            30,
            this.parentElement.dataset.tourTarget === "participants"
              ? 440
              : 180,
            13,
            13
          );
        return new DOMRect();
      }
    );
    render(<StudioFeatureTour />);
    const participants = screen.getByRole("button", {
      name: "Explore participant views",
    });
    expect(participants).toHaveAttribute("data-anchored", "false");
    expect(participants.style.getPropertyValue("--hotspot-y")).toBe("");
    expect(
      screen.getByRole("button", { name: "Explore facility structuring" })
    ).toHaveAttribute("data-anchored", "true");
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

  it("automatically rotates the guided preview while all app controls remain inert", () => {
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
      "allocate"
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
    expect(screen.getByText("$248,600,000")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Request Studio access/i })
    ).toHaveFocus();
    completeSequence();
    expect(lender).toHaveAttribute("aria-selected", "true");
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
    expect(screen.getByText("$248,600,000")).toBeInTheDocument();
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

  it("lets entrance motion finish while early table focus pauses incoming events", () => {
    const { preview } = visiblePreview();
    fireEvent.click(screen.getByRole("tab", { name: /Lenders/i }));
    const vaults = screen.getByRole("region", { name: "Lending vaults" });
    act(() => vaults.focus());
    const desk = screen.getByTestId("studio-desk");
    expect(desk).toHaveAttribute("data-playing", "false");
    expect(desk).toHaveAttribute("data-motion-running", "true");
    advance(5000);
    expect(screen.queryByText("October report")).not.toBeInTheDocument();
    expect(vaults).toHaveFocus();
    act(() => PreviewObserver.emit(preview, false));
    expect(desk).toHaveAttribute("data-motion-running", "false");
    act(() => PreviewObserver.emit(preview, true));
    expect(desk).toHaveAttribute("data-motion-running", "true");
    expect(desk).toHaveAttribute("data-playing", "false");
    act(() =>
      screen.getByRole("button", { name: /Request Studio access/i }).focus()
    );
    advance();
    expect(screen.getByText("October report")).toBeInTheDocument();
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
    expect(screen.getByText("$248,600,000")).toBeInTheDocument();
  });
});
