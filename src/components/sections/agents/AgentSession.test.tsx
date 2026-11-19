import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AgentsSection from "../AgentsSection";

const motion = vi.hoisted(() => ({ inView: true, reduced: false }));
vi.mock("framer-motion", async (original) => ({
  ...(await original<typeof import("framer-motion")>()),
  useInView: () => motion.inView,
  useReducedMotion: () => motion.reduced,
}));

beforeEach(() => {
  vi.useFakeTimers();
  motion.inView = true;
  motion.reduced = false;
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const advance = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });
const prompt = () =>
  screen
    .getByTestId("agent-session")
    .querySelector(".agent-session__prompt-text")!;

describe("illustrative MCP session", () => {
  it("reveals the table and each row's dividers only when their results arrive", () => {
    render(<AgentsSection />);
    const session = screen.getByTestId("agent-session");
    const table = session.querySelector("table")!;
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    expect(table).not.toBeVisible();
    advance(4800);
    expect(table).not.toBeVisible();
    advance(100);
    expect(table).toBeVisible();
    rows.forEach((row) => expect(row).not.toBeVisible());
    advance(300);
    expect(rows[0]).toBeVisible();
    expect(rows[1]).not.toBeVisible();
    advance(300);
    expect(rows[1]).toBeVisible();
    expect(rows[2]).not.toBeVisible();
    advance(300);
    expect(rows[2]).toBeVisible();
    advance(5200);
    expect(table).not.toBeVisible();
  });

  it("types a prompt, queries facility data and returns to the start after the completed result", () => {
    render(<AgentsSection />);
    expect(prompt().textContent).toBe("");
    advance(1400);
    expect(prompt().textContent!.length).toBeGreaterThan(0);
    expect(prompt().textContent!.length).toBeLessThan(52);
    advance(1200);
    expect(prompt()).toHaveTextContent(
      "Summarise my vault balances and latest activity."
    );
    expect(screen.getByText("list_vaults").closest("li")).toHaveTextContent(
      "running"
    );
    advance(2400);
    expect(screen.getByText("list_vaults").closest("li")).toHaveTextContent(
      "3 vaults"
    );
    expect(
      screen.getByText("list_transactions").closest("li")
    ).toHaveTextContent("Activity retrieved");
    advance(6000);
    expect(prompt().textContent).toBe("");
  });

  it("pauses the in-progress prompt offscreen and continues when it returns", () => {
    const view = render(<AgentsSection />);
    advance(1200);
    const partial = prompt().textContent;
    motion.inView = false;
    view.rerender(<AgentsSection />);
    advance(5000);
    expect(prompt().textContent).toBe(partial);
    motion.inView = true;
    view.rerender(<AgentsSection />);
    advance(1000);
    expect(prompt()).toHaveTextContent(
      "Summarise my vault balances and latest activity."
    );
  });

  it("pauses when the browser tab is hidden", () => {
    render(<AgentsSection />);
    advance(1200);
    const partial = prompt().textContent;
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    advance(5000);
    expect(prompt().textContent).toBe(partial);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    advance(1000);
    expect(prompt()).toHaveTextContent(
      "Summarise my vault balances and latest activity."
    );
  });

  it("lets a reader pause and resume the demo without losing their place", () => {
    render(<AgentsSection />);
    advance(1400);
    const partial = prompt().textContent;
    fireEvent.click(
      screen.getByRole("button", { name: "Pause agent animation" })
    );
    advance(12000);
    expect(prompt().textContent).toBe(partial);
    fireEvent.click(
      screen.getByRole("button", { name: "Resume agent animation" })
    );
    advance(800);
    expect(prompt()).toHaveTextContent(
      "Summarise my vault balances and latest activity."
    );
  });

  it("shows a completed static session for reduced motion", () => {
    motion.reduced = true;
    render(<AgentsSection />);
    expect(prompt()).toHaveTextContent(
      "Summarise my vault balances and latest activity."
    );
    expect(
      screen.getByText("list_transactions").closest("li")
    ).toHaveTextContent("Activity retrieved");
    expect(
      within(screen.getByTestId("agent-session")).queryByText("running")
    ).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.queryByRole("button", { name: /agent animation/i })
    ).not.toBeInTheDocument();
  });
});
