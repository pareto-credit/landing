import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreditHistoryChart from "./CreditHistoryChart";

const feed = { source: "Verified history", asOf: "2026-10-29", isLoading: false, error: null };

describe("credit history continuity", () => {
  it("carries each series forward, preserves zero and leaves leading unknowns empty", () => {
    const { container } = render(<CreditHistoryChart
      {...feed}
      points={[
        { date: "2026-10-26", creditExtendedUsd: null, tvlUsd: null },
        { date: "2026-10-27", creditExtendedUsd: 0, tvlUsd: null },
        { date: "2026-10-28", creditExtendedUsd: null, tvlUsd: 150 },
        { date: "2026-10-29", creditExtendedUsd: 10, tvlUsd: null },
      ]}
    />);
    const chart = screen.getByRole("img", { name: "Credit activity over time" });
    const inspection = within(container.querySelector(".credit-history-inspection") as HTMLElement);
    fireEvent.keyDown(chart, { key: "Home" });
    expect(inspection.getAllByText("—")).toHaveLength(2);
    fireEvent.keyDown(chart, { key: "ArrowRight" });
    expect(inspection.getByText("$0")).toBeInTheDocument();
    expect(inspection.getByText("—")).toBeInTheDocument();
    fireEvent.keyDown(chart, { key: "ArrowRight" });
    expect(inspection.getByText("$0")).toBeInTheDocument();
    expect(inspection.getByText("$150")).toBeInTheDocument();
    fireEvent.keyDown(chart, { key: "End" });
    expect(inspection.getByText("$10")).toBeInTheDocument();
    expect(inspection.getByText("$150")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Outstanding Loans" })).toBeInTheDocument();
  });

  it("seeds a selected range from the last value before its start", () => {
    const { container } = render(<CreditHistoryChart
      {...feed}
      points={[
        { date: "2026-09-01", creditExtendedUsd: 100, tvlUsd: 50 },
        { date: "2026-10-01", creditExtendedUsd: null, tvlUsd: null },
        { date: "2026-10-29", creditExtendedUsd: 200, tvlUsd: 80 },
      ]}
    />);
    fireEvent.click(screen.getByRole("button", { name: "1M" }));
    fireEvent.keyDown(screen.getByRole("img", { name: "Credit activity over time" }), { key: "Home" });
    const inspection = within(container.querySelector(".credit-history-inspection") as HTMLElement);
    expect(inspection.getByText("Sep 29, 2026")).toBeInTheDocument();
    expect(inspection.getByText("$100")).toBeInTheDocument();
    expect(inspection.getByText("$50")).toBeInTheDocument();
  });

  it("inspects the held value without jumping to a future report before its date", () => {
    const { container } = render(<CreditHistoryChart {...feed} points={[
      { date: "2026-10-26", creditExtendedUsd: 100, tvlUsd: 50 },
      { date: "2026-10-29", creditExtendedUsd: 200, tvlUsd: 60 },
    ]} />);
    const chart = screen.getByRole("img", { name: "Credit activity over time" });
    const bounds = vi.spyOn(chart, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 1000, 310));
    fireEvent(chart, new MouseEvent("pointermove", { bubbles: true, clientX: 750 }));
    const inspection = within(container.querySelector(".credit-history-inspection") as HTMLElement);
    expect(inspection.getByText("Oct 26, 2026")).toBeInTheDocument();
    expect(inspection.getByText("$100")).toBeInTheDocument();
    expect(inspection.getByText("$50")).toBeInTheDocument();
    bounds.mockRestore();
  });
});
