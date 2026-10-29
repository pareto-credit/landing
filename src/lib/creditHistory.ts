export interface CreditHistoryPoint {
  date: string;
  creditExtendedUsd: number | null;
  tvlUsd: number | null;
}

export interface CreditHistoryData {
  points: CreditHistoryPoint[];
  source: string | null;
  asOf: string | null;
}

/** Display continuity only: never backfill before a series' first real value. */
export function carryForwardCreditHistory(points: readonly CreditHistoryPoint[]): CreditHistoryPoint[] {
  let creditExtendedUsd: number | null = null;
  let tvlUsd: number | null = null;
  return points.map(point => {
    creditExtendedUsd = point.creditExtendedUsd ?? creditExtendedUsd;
    tvlUsd = point.tvlUsd ?? tvlUsd;
    return { date: point.date, creditExtendedUsd, tvlUsd };
  });
}

const amount = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : null;

/** Explicit normalized-USD contract. Current totals are never expanded into invented history. */
export function parseCreditHistory(payload: unknown): CreditHistoryData {
  if (
    !payload ||
    typeof payload !== "object" ||
    !Array.isArray((payload as { points?: unknown }).points)
  ) {
    throw new Error(
      "Historical credit data is unavailable: invalid history feed."
    );
  }
  const input = payload as {
    points: unknown[];
    source?: unknown;
    asOf?: unknown;
  };
  const byDay = new Map<string, CreditHistoryPoint>();
  for (const item of input.points) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    if (typeof row.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.date))
      continue;
    const timestamp = Date.parse(row.date + "T00:00:00Z");
    if (
      !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== row.date
    )
      continue;
    byDay.set(row.date, {
      date: row.date,
      creditExtendedUsd: amount(row.creditExtendedUsd),
      tvlUsd: amount(row.tvlUsd),
    });
  }
  return {
    points: [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date)),
    source: typeof input.source === "string" ? input.source : null,
    asOf: typeof input.asOf === "string" ? input.asOf : null,
  };
}

export async function fetchCreditHistory(
  url: string,
  signal?: AbortSignal,
  get: typeof fetch = fetch
): Promise<CreditHistoryData> {
  const response = await get(url, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok)
    throw new Error(
      `Historical credit data is unavailable (${response.status}).`
    );
  return parseCreditHistory(await response.json());
}
