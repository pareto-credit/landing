import { describe, expect, it, vi } from "vitest";
import { aggregateCreditHistory, fetchAggregateCreditHistory } from "./aggregateCreditHistory";

const at = (date: string) => Date.parse(`${date}T12:00:00Z`) / 1000;
const vault = (id: string) => ({ _id: id, address: `0x${id}`, name: id, contractType: "CDO_EPOCH", visibility: "PUBLIC", status: "READY" });
const block = (id: string, day: string, usd: unknown, requests?: unknown) => ({
  _id: `${id}-${day}`, vaultId: id, block: { timestamp: at(day) },
  TVL: { USD: usd, ...(requests !== undefined ? { withRequestsUSD: requests } : {}) },
});
const epoch = (id: string, day: string, count: number, usd: unknown) => ({
  _id: `${id}-epoch-${count}`, vaultId: id, count,
  block: { timestamp: at(day) }, startDate: `${day}T00:00:00Z`, creditExtended: { USD: usd },
});

describe("public credit history aggregation", () => {
  it("aggregates daily last snapshots, normalizes USD once and does not sum cumulative epochs", () => {
    const result = aggregateCreditHistory({
      vaults: [vault("a"), vault("b")],
      blocks: [block("a", "2026-10-27", "100000000"), block("a", "2026-10-28", "90000000", "120000000"), block("b", "2026-10-28", "50000000")],
      epochs: [epoch("a", "2026-10-27", 1, "1000000000"), epoch("a", "2026-10-28", 2, "2000000000"), epoch("b", "2026-10-28", 1, "500000000")],
      retrievedAt: "2026-10-29T12:00:00Z",
    });
    expect(result.points).toEqual([
      { date: "2026-10-27", creditExtendedUsd: 1000, tvlUsd: 100 },
      { date: "2026-10-28", creditExtendedUsd: 2500, tvlUsd: 170 },
    ]);
    expect(result.scope.vaultIds).toEqual(["a", "b"]);
    expect(result.asOf).toBe("2026-10-28");
  });

  it("keeps a true zero and a missing balance distinct, and restores data after a gap", () => {
    const result = aggregateCreditHistory({
      vaults: [vault("a")],
      blocks: [block("a", "2026-10-27", "0"), block("a", "2026-10-28", null), block("a", "2026-10-29", "7000000")],
      epochs: [epoch("a", "2026-10-27", 1, "0")],
      retrievedAt: "2026-10-29T18:00:00Z",
    });
    expect(result.points.map(p => p.tvlUsd)).toEqual([0, null, 7]);
  });

  it("uses observation timestamps, ignores future rows and never backdates an epoch's later reported total", () => {
    const result = aggregateCreditHistory({
      vaults: [vault("a")],
      blocks: [block("a", "2026-10-27", "1000000"), block("a", "2026-10-28", "2000000"), block("a", "2026-10-30", "999000000")],
      epochs: [{ ...epoch("a", "2026-10-28", 1, "200000000"), startDate: "2026-10-27T00:00:00Z" }],
      retrievedAt: "2026-10-29T18:00:00Z",
    });
    expect(result.points).toEqual([
      { date: "2026-10-27", creditExtendedUsd: null, tvlUsd: 1 },
      { date: "2026-10-28", creditExtendedUsd: 200, tvlUsd: 2 },
    ]);
  });

  it("does not let an older epoch overwrite the cumulative credit of a newer cycle", () => {
    const result = aggregateCreditHistory({
      vaults: [vault("a")],
      blocks: [block("a", "2026-10-27", "1000000"), block("a", "2026-10-29", "2000000")],
      epochs: [epoch("a", "2026-10-27", 2, "200000000"), epoch("a", "2026-10-28", 1, "100000000")],
      retrievedAt: "2026-10-29T18:00:00Z",
    });
    expect(result.points.at(-1)?.creditExtendedUsd).toBe(200);
  });

  it("rejects incomplete vault history rather than emitting a partial aggregate", () => {
    expect(() => aggregateCreditHistory({vaults: [vault("a"), vault("b")], blocks: [block("a", "2026-10-27", "1000000")], epochs: [], retrievedAt: "2026-10-29T18:00:00Z"})).toThrow(/missing.*history/i);
  });
});

describe("public history fetching", () => {
  it("aborts other vault requests when one source fails", async () => {
    let pendingSignal: AbortSignal | null | undefined;
    let finishPending: (error: Error) => void = () => {};
    const get = vi.fn<typeof fetch>().mockImplementation(async (input, init) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/vaults")) return Response.json({data: [vault("a"), vault("b")], totalCount: 2});
      if (url.pathname.endsWith("/vault-epochs")) return Response.json({data: [], totalCount: 0});
      if (url.searchParams.get("vaultId") === "a") return new Response("", {status: 503});
      pendingSignal = init?.signal;
      return new Promise<Response>((_, reject) => {
        finishPending = reject;
        pendingSignal?.addEventListener("abort", () => reject(new Error("Aborted")), {once: true});
      });
    });
    try {
      await expect(fetchAggregateCreditHistory({get})).rejects.toThrow(/503/);
      expect(pendingSignal?.aborted).toBe(true);
    } finally {
      finishPending(new Error("Test cleanup"));
    }
  });

  it("retrieves every page using the deployed 50-row limit", async () => {
    const records = Array.from({length: 52}, (_, index) => ({
      ...block("a", "2026-10-27", String((index + 1) * 1_000_000)),
      _id: `block-${index}`, block: { timestamp: at("2026-10-27") + index },
    }));
    const get = vi.fn<typeof fetch>().mockImplementation(async input => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/vaults")) return Response.json({data: [vault("a")], totalCount: 1});
      if (url.pathname.endsWith("/vault-epochs")) return Response.json({data: [epoch("a", "2026-10-27", 1, "100000000")], totalCount: 1});
      const offset = Number(url.searchParams.get("offset"));
      return Response.json({data: records.slice(offset, offset + 50), totalCount: records.length});
    });
    const result = await fetchAggregateCreditHistory({get, retrievedAt: "2026-10-29T18:00:00Z"});
    expect(result.points[0].tvlUsd).toBe(52);
    expect(get.mock.calls.map(([url]) => String(url))).toContainEqual(expect.stringContaining("offset=50"));
  });

  it("uses published credit vaults, excludes index wrappers, and validates returned vault scope", async () => {
    const get = vi.fn<typeof fetch>().mockImplementation(async (url) => {
      const path = new URL(String(url)).pathname;
      if (path.endsWith("/vaults")) return Response.json({data: [vault("a"), {...vault("index"), contractType: "PARETO_DOLLAR"}], totalCount: 2});
      if (path.endsWith("/vault-blocks")) return Response.json({data: [block("a", "2026-10-27", "1000000")], totalCount: 1});
      return Response.json({data: [epoch("a", "2026-10-27", 1, "2000000")], totalCount: 1});
    });
    const result = await fetchAggregateCreditHistory({get, retrievedAt: "2026-10-29T18:00:00Z"});
    expect(result.scope.vaultIds).toEqual(["a"]);
    expect(result.points[0]).toEqual({date: "2026-10-27", creditExtendedUsd: 2, tvlUsd: 1});
    expect(get.mock.calls.every(([url]) => new URL(String(url)).searchParams.get("limit") === "50")).toBe(true);

    get.mockImplementation(async (url) => new URL(String(url)).pathname.endsWith("/vaults")
      ? Response.json({data: [vault("a")], totalCount: 1})
      : Response.json({data: [block("wrong-vault", "2026-10-27", "1000000")], totalCount: 1}));
    await expect(fetchAggregateCreditHistory({get})).rejects.toThrow(/scope/i);
  });

  it("rejects failed requests and incomplete pagination", async () => {
    await expect(fetchAggregateCreditHistory({get: vi.fn().mockResolvedValue(new Response("", {status: 503}))})).rejects.toThrow(/503/);
    const get = vi.fn<typeof fetch>().mockResolvedValue(Response.json({data: [vault("a")], totalCount: 55}));
    await expect(fetchAggregateCreditHistory({get})).rejects.toThrow(/pagination/i);
  });
});
