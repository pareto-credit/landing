import { describe, expect, it, vi } from "vitest";
import { fetchCreditHistory, parseCreditHistory } from "./creditHistory";

describe("credit history data contract", () => {
  it("preserves normalized USD and a real zero while retaining missing values as gaps", () => {
    const history = parseCreditHistory({
      source: "Pareto",
      asOf: "2026-10-28",
      points: [
        {
          date: "2026-10-27",
          creditExtendedUsd: 1_400_000_000,
          tvlUsd: 0,
        },
        {
          date: "2026-10-28",
          creditExtendedUsd: null,
          tvlUsd: 150_000_000,
        },
      ],
    });
    expect(history.points[0]).toEqual({
      date: "2026-10-27",
      creditExtendedUsd: 1_400_000_000,
      tvlUsd: 0,
    });
    expect(history.points[1].creditExtendedUsd).toBeNull();
  });
  it("orders days, keeps the last observation per day and rejects malformed dates and amounts", () => {
    expect(
      parseCreditHistory({
        points: [
          { date: "2026-10-28", creditExtendedUsd: 2, tvlUsd: 1 },
          { date: "2026-10-27", creditExtendedUsd: 1, tvlUsd: 0 },
          { date: "2026-10-28", creditExtendedUsd: 3, tvlUsd: -1 },
          { date: "2026-02-30", creditExtendedUsd: 99 },
          {
            date: "2026-10-29",
            creditExtendedUsd: "not reported",
            tvlUsd: Infinity,
          },
        ],
      }).points
    ).toEqual([
      { date: "2026-10-27", creditExtendedUsd: 1, tvlUsd: 0 },
      { date: "2026-10-28", creditExtendedUsd: 3, tvlUsd: null },
      {
        date: "2026-10-29",
        creditExtendedUsd: null,
        tvlUsd: null,
      },
    ]);
  });
  it("does not mistake current protocol totals for a historical series", () => {
    expect(() =>
      parseCreditHistory({ creditExtended: "1400000000", TVL: "150000000" })
    ).toThrow(/history/i);
  });
  it("rejects a failed feed instead of filling it with an invented curve", async () => {
    const get = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    await expect(
      fetchCreditHistory("/credit.json", undefined, get as typeof fetch)
    ).rejects.toThrow("503");
  });
});
