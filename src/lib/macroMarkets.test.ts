import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchBenchmarkRates,
  fetchTreasuryRates,
  parseBenchmarkRates,
  parseTreasuryRates,
  parseMorphoRates,
  treasuryCurveSlopeBps,
} from "./macroMarkets";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("macro market observations", () => {
  it("expresses the Treasury curve slope in basis points without mixing observation dates", () => {
    expect(
      treasuryCurveSlopeBps({
        twoYear: { value: 4, asOf: "2026-10-27" },
        tenYear: { value: 4.5, asOf: "2026-10-27" },
      })
    ).toBe(50);
    expect(
      treasuryCurveSlopeBps({
        twoYear: { value: 4, asOf: "2026-10-26" },
        tenYear: { value: 4.5, asOf: "2026-10-27" },
      })
    ).toBe(null);
    expect(
      treasuryCurveSlopeBps({
        twoYear: { value: null, asOf: null },
        tenYear: { value: 4.5, asOf: "2026-10-27" },
      })
    ).toBe(null);
  });
  it("weights Morpho supply and borrow rates separately, using only the matching Ethereum base asset", () => {
    const data = parseMorphoRates(
      {
        data: {
          markets: {
            items: [
              {
                marketId: "a",
                loanAsset: {
                  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                  symbol: "USDC",
                },
                state: {
                  supplyApy: 0.02,
                  borrowApy: 0.04,
                  supplyAssetsUsd: 100,
                  borrowAssetsUsd: 50,
                },
              },
              {
                marketId: "b",
                loanAsset: {
                  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                  symbol: "USDC",
                },
                state: {
                  supplyApy: 0.06,
                  borrowApy: 0.08,
                  supplyAssetsUsd: 300,
                  borrowAssetsUsd: 50,
                },
              },
              {
                marketId: "c",
                loanAsset: { address: "0x0000", symbol: "USDC" },
                state: {
                  supplyApy: 0.9,
                  borrowApy: 0.9,
                  supplyAssetsUsd: 1000,
                  borrowAssetsUsd: 1000,
                },
              },
            ],
          },
        },
      },
      "2026-10-28T10:00:00Z"
    );
    expect(data[0]).toMatchObject({
      protocol: "Morpho",
      asset: "USDC",
      supplyApy: 5,
      borrowApy: 6,
      marketCount: 2,
    });
    expect(data[1]).toMatchObject({
      asset: "USDT",
      supplyApy: null,
      borrowApy: null,
      marketCount: 0,
    });
  });

  it("refuses GraphQL errors and does not count an incomplete Morpho sample as a market rate", () => {
    expect(() =>
      parseMorphoRates(
        { errors: [{ message: "Unavailable" }] },
        "2026-10-28T10:00:00Z"
      )
    ).toThrow();
    const data = parseMorphoRates(
      {
        data: {
          markets: {
            items: [
              {
                marketId: "a",
                loanAsset: {
                  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                  symbol: "USDT",
                },
                state: {
                  supplyApy: null,
                  borrowApy: 0,
                  supplyAssetsUsd: 100,
                  borrowAssetsUsd: 50,
                },
              },
            ],
          },
        },
      },
      "2026-10-28T10:00:00Z"
    );
    expect(data[1]).toMatchObject({ supplyApy: null, borrowApy: 0 });
  });
  it("reads the separate SOFRAI average instead of treating overnight SOFR as a 30-day average", () => {
    const data = parseBenchmarkRates({
      refRates: [
        { type: "SOFR", effectiveDate: "2026-10-27", percentRate: 4.1 },
        { type: "SOFRAI", effectiveDate: "2026-10-28", average30day: 3.9 },
        { type: "EFFR", effectiveDate: "2026-10-27", percentRate: 3.88 },
      ],
    });
    expect(data).toEqual({
      sofr30d: { value: 3.9, asOf: "2026-10-28" },
      sofr: { value: 4.1, asOf: "2026-10-27" },
      effr: { value: 3.88, asOf: "2026-10-27" },
    });
  });

  it("preserves zero while refusing missing values and impossible publication dates", () => {
    const data = parseBenchmarkRates({
      refRates: [
        { type: "SOFR", effectiveDate: "2026-10-27", percentRate: 0 },
        { type: "SOFRAI", effectiveDate: "2026-10-28", average30day: null },
        { type: "EFFR", effectiveDate: "2026-02-31", percentRate: 4 },
      ],
    });
    expect(data.sofr).toEqual({ value: 0, asOf: "2026-10-27" });
    expect(data.sofr30d).toEqual({ value: null, asOf: null });
    expect(data.effr).toEqual({ value: null, asOf: null });
  });

  it("uses the newest published observation without backfilling a missing current value", () => {
    const data = parseBenchmarkRates({
      refRates: [
        { type: "SOFR", effectiveDate: "2026-10-26", percentRate: 4.2 },
        { type: "SOFR", effectiveDate: "2026-10-27", percentRate: "" },
      ],
    });
    expect(data.sofr).toEqual({ value: null, asOf: null });
  });

  it("reads the latest Treasury XML row and keeps a missing tenor unavailable", () => {
    const xml = `<feed xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"><entry><properties><d:NEW_DATE>2026-10-26T00:00:00</d:NEW_DATE><d:BC_2YEAR>4.1</d:BC_2YEAR><d:BC_10YEAR>4.5</d:BC_10YEAR></properties></entry><entry><properties><d:NEW_DATE>2026-10-27T00:00:00</d:NEW_DATE><d:BC_2YEAR>0</d:BC_2YEAR></properties></entry></feed>`;
    expect(parseTreasuryRates(xml)).toEqual({
      twoYear: { value: 0, asOf: "2026-10-27" },
      tenYear: { value: null, asOf: null },
    });
  });

  it("rejects malformed or non-data responses", () => {
    expect(() => parseBenchmarkRates({ error: "not available" })).toThrow();
    expect(() => parseTreasuryRates("<html>Access denied</html>")).toThrow();
  });

  it("keeps an independent successful Treasury source when the rates source fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.includes("newyorkfed"))
          return new Response("Unavailable", { status: 503 });
        return new Response(
          "<root><row><NEW_DATE>2026-10-27T00:00:00</NEW_DATE><BC_2YEAR>4.1</BC_2YEAR><BC_10YEAR>4.5</BC_10YEAR></row></root>"
        );
      })
    );
    const [rates, treasury] = await Promise.allSettled([
      fetchBenchmarkRates(),
      fetchTreasuryRates(),
    ]);
    expect(rates.status).toBe("rejected");
    expect(treasury).toMatchObject({
      status: "fulfilled",
      value: { twoYear: { value: 4.1, asOf: "2026-10-27" } },
    });
  });

  it("aborts a stalled source after its timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener(
              "abort",
              () => reject(new DOMException("Aborted", "AbortError")),
              { once: true }
            );
          })
      )
    );
    const result = fetchBenchmarkRates().catch((error: Error) => error.name);
    await vi.advanceTimersByTimeAsync(12_000);
    expect(await result).toBe("AbortError");
  });
});
