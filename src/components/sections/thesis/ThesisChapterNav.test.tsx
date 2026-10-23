import { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { thesisChapters } from "../../../data/thesis";
import ThesisChapterNav from "./ThesisChapterNav";

const chapterTops = new Map<string, number>();

const TestMenu = ({ isCurrentPage = true }: { isCurrentPage?: boolean }) => {
  const [open, setOpen] = useState(false);
  return <ThesisChapterNav isCurrentPage={isCurrentPage} open={open} onOpenChange={setOpen} />;
};

const renderContents = (isCurrentPage = true) => render(
  <>
    <TestMenu isCurrentPage={isCurrentPage} />
    {thesisChapters.map(({ id, label }) => (
      <section id={id} key={id}><h2 id={`${id}-title`} tabIndex={-1}>{label}</h2></section>
    ))}
  </>,
);

const updateScroll = () => act(() => {
  fireEvent.scroll(window);
  vi.runOnlyPendingTimers();
});

beforeEach(() => {
  vi.useFakeTimers();
  chapterTops.clear();
  thesisChapters.forEach(({ id }, index) => chapterTops.set(id, 1000 + index * 500));
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => window.setTimeout(() => callback(0), 0));
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation((frame) => window.clearTimeout(frame));
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    return { top: chapterTops.get(this.id) ?? 72, bottom: 140 } as DOMRect;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("ThesisChapterNav", () => {
  it("links every contents entry to a chapter on this page", () => {
    renderContents();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /thesis chapters/i }));
    for (const { id, label } of thesisChapters) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", `/thesis#${id}`);
    }
  });

  it("tracks the chapter at the reading line without changing browser history", () => {
    const replaceState = vi.spyOn(window.history, "replaceState");
    renderContents();
    act(() => vi.runOnlyPendingTimers());
    expect(screen.getByRole("button", { name: /thesis chapters.*overview/i })).toBeInTheDocument();

    chapterTops.set("opportunity", -300);
    chapterTops.set("constraint", 100);
    updateScroll();
    fireEvent.click(screen.getByRole("button", { name: /thesis chapters.*the constraint/i }));
    expect(screen.getByRole("link", { name: "The constraint" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "Opportunity" })).not.toHaveAttribute("aria-current");
    expect(replaceState).not.toHaveBeenCalled();

    chapterTops.set("constraint", 800);
    chapterTops.set("opportunity", 400);
    updateScroll();
    expect(screen.getByRole("button", { name: /thesis chapters.*overview/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("tracks the carousel as the first chapter", () => {
    chapterTops.set("legacy", 100);
    renderContents();
    act(() => vi.runOnlyPendingTimers());
    const toggle = screen.getByRole("button", { name: /thesis chapters.*the legacy/i });
    expect(toggle).not.toHaveTextContent(/7 chapters|01\s*\/\s*07/);
    fireEvent.click(toggle);
    expect(screen.getByRole("link", { name: "The legacy" })).toHaveAttribute("aria-current", "location");
  });

  it("does not track matching section ids or focus another page's headings", () => {
    chapterTops.set("legacy", 100);
    renderContents(false);
    act(() => vi.runOnlyPendingTimers());
    const toggle = screen.getByRole("button", { name: "Thesis chapters" });
    expect(toggle).not.toHaveAttribute("aria-current");
    fireEvent.click(toggle);
    expect(screen.getByRole("link", { name: "The legacy" })).not.toHaveAttribute("aria-current");
    fireEvent.click(screen.getByRole("link", { name: "Why onchain" }));
    act(() => vi.runOnlyPendingTimers());
    expect(screen.getByRole("heading", { name: "Why onchain" })).not.toHaveFocus();
  });

  it("dismisses expanded contents with Escape and returns focus to its button", () => {
    renderContents();
    const toggle = screen.getByRole("button", { name: /thesis chapters/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    screen.getByRole("link", { name: "Why onchain" }).focus();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes contents and focuses the selected chapter heading", () => {
    renderContents();
    const toggle = screen.getByRole("button", { name: /thesis chapters/i });
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("link", { name: "Why onchain" }));
    act(() => vi.runOnlyPendingTimers());
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("heading", { name: "Why onchain" })).toHaveFocus();
  });

  it("closes expanded contents after a pointer interaction outside it", () => {
    renderContents();
    const toggle = screen.getByRole("button", { name: /thesis chapters/i });
    fireEvent.click(toggle);
    fireEvent.pointerDown(document.body);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("dismisses the header index on page scroll and restores keyboard focus", () => {
    renderContents();
    const toggle = screen.getByRole("button", { name: /thesis chapters/i });
    fireEvent.click(toggle);
    screen.getByRole("link", { name: "The legacy" }).focus();
    fireEvent.scroll(window);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });
});
