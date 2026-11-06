import type { CreditHistoryPoint } from "./creditHistory";

type Row = Record<string, unknown>;
interface IndexedRow { vaultId: string; timestamp: number; row: Row }
interface PublicVault extends Row { _id: string; address: string; name: string }

export interface AggregateHistoryFeed {
  schemaVersion: 2;
  source: string;
  asOf: string;
  retrievedAt: string;
  points: CreditHistoryPoint[];
  scope: { vaultIds: string[]; vaultNames: string[]; description: string };
  methodology: { creditExtended: string; tvl: string; observations: string };
}

const API_BASE = "https://api.pareto.credit/";
const PAGE_SIZE = 50;
const DAY = 86_400;
const record = (value: unknown): Row => value !== null && typeof value === "object" ? value as Row : {};
const timestamp = (value: unknown): number | null => typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : null;
const usd = (value: unknown): number | null => {
  if (typeof value !== "string" && typeof value !== "number") return null;
  if (typeof value === "string" && !/^\d+(?:\.\d+)?$/.test(value)) return null;
  const result = Number(value) / 1_000_000;
  return Number.isFinite(result) && result >= 0 ? result : null;
};
const date = (seconds: number) => new Date(seconds * 1000).toISOString().slice(0, 10);

/** Aggregate only dated source observations, retaining unavailable values as gaps. */
export function aggregateCreditHistory({
  vaults, blocks, epochs, retrievedAt,
}: { vaults: unknown[]; blocks: unknown[]; epochs: unknown[]; retrievedAt: string }): AggregateHistoryFeed {
  const cutoff = Date.parse(retrievedAt) / 1000;
  if (!Number.isFinite(cutoff)) throw new Error("Invalid history retrieval date");
  const scope = vaults.map((value): PublicVault => {
    const row = record(value);
    if (typeof row._id !== "string" || !row._id || typeof row.address !== "string" || !row.address)
      throw new Error("Invalid public vault scope");
    return { ...row, _id: row._id, address: row.address, name: typeof row.name === "string" ? row.name : row._id };
  });
  const ids = new Set(scope.map(vault => vault._id));
  if (!ids.size || ids.size !== scope.length) throw new Error("Empty or duplicate public vault scope");
  const indexed = (values: unknown[]): IndexedRow[] => values.map(value => {
    const row = record(value);
    const time = timestamp(record(row.block).timestamp);
    if (typeof row.vaultId !== "string" || !ids.has(row.vaultId)) throw new Error("Historical response violates vault scope");
    if (time === null) throw new Error("Historical observation has no valid timestamp");
    return { vaultId: row.vaultId, timestamp: time, row };
  }).filter(row => row.timestamp <= cutoff).sort((a, b) => a.timestamp - b.timestamp);
  const balanceRows = indexed(blocks);
  const creditRows = indexed(epochs);
  for (const id of ids) {
    if (!balanceRows.some(row => row.vaultId === id)) throw new Error(`Missing vault history for ${id}`);
  }
  const days = [...new Set([...balanceRows, ...creditRows].map(row => date(row.timestamp)))].sort();
  const balances = new Map<string, number | null>();
  const credits = new Map<string, { count: number; amount: number | null }>();
  const firstEpochStart = new Map<string, number>();
  for (const { vaultId, row } of creditRows) {
    const start = typeof row.startDate === "string" ? Date.parse(row.startDate) / 1000 : NaN;
    if (Number.isFinite(start)) firstEpochStart.set(vaultId, Math.min(firstEpochStart.get(vaultId) ?? Infinity, start));
  }
  let balanceIndex = 0;
  let creditIndex = 0;
  const sum = (values: Array<number | null>) => values.some(value => value === null)
    ? null : values.reduce<number>((total, value) => total + value!, 0);
  const points = days.map(day => {
    const end = Math.min(Date.parse(`${day}T00:00:00Z`) / 1000 + DAY - 1, cutoff);
    while (balanceIndex < balanceRows.length && balanceRows[balanceIndex].timestamp <= end) {
      const { vaultId, row } = balanceRows[balanceIndex++];
      const tvl = record(row.TVL);
      balances.set(vaultId, usd(tvl.withRequestsUSD ?? tvl.USD));
    }
    while (creditIndex < creditRows.length && creditRows[creditIndex].timestamp <= end) {
      const { vaultId, row } = creditRows[creditIndex++];
      const count = typeof row.count === "number" && Number.isSafeInteger(row.count) ? row.count : -1;
      if (count < 0) throw new Error("Epoch observation has no valid cycle count");
      if (count >= (credits.get(vaultId)?.count ?? -1))
        credits.set(vaultId, { count, amount: usd(record(row.creditExtended).USD) });
    }
    return {
      date: day,
      tvlUsd: sum([...ids].map(id => balances.has(id) ? balances.get(id)! : 0)),
      creditExtendedUsd: sum([...ids].map(id => credits.has(id) ? credits.get(id)!.amount
        : (firstEpochStart.get(id) ?? Infinity) <= end ? null : 0)),
    };
  });
  return {
    schemaVersion: 2,
    source: `Pareto public API · ${scope.length} credit facilities`,
    asOf: points.at(-1)!.date,
    retrievedAt,
    points,
    scope: {
      vaultIds: scope.map(vault => vault._id),
      vaultNames: scope.map(vault => vault.name),
      description: "Current published credit-vault cohort; excludes index wrappers, private facilities and unlisted siblings. Each facility enters coverage at its first indexed snapshot.",
    },
    methodology: {
      creditExtended: "Latest reported cumulative epoch credit per vault by observation block timestamp. Cumulative epoch values are never summed across cycles or backdated to their start dates.",
      tvl: "Latest indexed withRequestsUSD, falling back to USD only when the extended field is absent; six USD base-unit decimals. May include idle capital, retained interest and pending withdrawal cash. This is not borrower debt.",
      observations: "UTC daily last indexed snapshots on dates with source observations. Last reported values carry forward between index updates. A vault contributes zero before its first indexed snapshot; missing reported amounts remain gaps.",
    },
  };
}

async function fetchPage(url: URL, get: typeof fetch, signal?: AbortSignal): Promise<Row> {
  signal?.throwIfAborted();
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await get(url.toString(), { signal: controller.signal, credentials: "omit", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Public history request failed (${response.status})`);
    return record(await response.json());
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

async function pages(base: string, path: string, params: Record<string, string>, get: typeof fetch, signal?: AbortSignal): Promise<unknown[]> {
  const rows: unknown[] = [];
  const seen = new Set<string>();
  let total: number | undefined;
  do {
    const url = new URL(path, base.endsWith("/") ? base : `${base}/`);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    url.searchParams.set("limit", String(PAGE_SIZE));
    url.searchParams.set("offset", String(rows.length));
    const page = await fetchPage(url, get, signal);
    if (!Array.isArray(page.data) || typeof page.totalCount !== "number" || !Number.isSafeInteger(page.totalCount) || page.totalCount < 0)
      throw new Error("Invalid public history pagination");
    total ??= page.totalCount;
    if (total > 50_000 || page.totalCount < total || page.data.length > PAGE_SIZE)
      throw new Error("Public history pagination changed or exceeded limits");
    const remaining = total - rows.length;
    if (page.data.length < Math.min(PAGE_SIZE, remaining)) throw new Error("Incomplete public history pagination");
    for (const value of page.data.slice(0, remaining)) {
      const id = record(value)._id;
      if (typeof id !== "string" || seen.has(id)) throw new Error("Duplicate or missing ID in public history pagination");
      seen.add(id);
      // Public block responses contain large request/integration histories.
      // Retain only the accounting fields needed for this aggregate.
      if (path.endsWith("vault-blocks") || path.endsWith("vault-epochs")) {
        const row = record(value);
        rows.push({ _id: row._id, vaultId: row.vaultId, block: row.block,
          TVL: row.TVL, creditExtended: row.creditExtended, count: row.count,
          startDate: row.startDate });
      } else rows.push(value);
    }
  } while (rows.length < total);
  return rows;
}

/** Fetch anonymously once for a compact cached feed, rather than loading raw history per visitor. */
interface AggregateHistoryOptions {
  get?: typeof fetch;
  apiBase?: string;
  signal?: AbortSignal;
  retrievedAt?: string;
  onProgress?: (message: string) => void;
}

export async function fetchAggregateCreditHistory(options: AggregateHistoryOptions = {}): Promise<AggregateHistoryFeed> {
  const controller = new AbortController();
  const onAbort = () => controller.abort(options.signal?.reason);
  if (options.signal?.aborted) onAbort();
  else options.signal?.addEventListener("abort", onAbort, { once: true });
  try {
    return await fetchAggregateCreditHistoryData({ ...options, signal: controller.signal });
  } catch (error) {
    controller.abort(error);
    throw error;
  } finally {
    options.signal?.removeEventListener("abort", onAbort);
  }
}

async function fetchAggregateCreditHistoryData({
  get = fetch, apiBase = API_BASE, signal, retrievedAt, onProgress,
}: AggregateHistoryOptions): Promise<AggregateHistoryFeed> {
  const catalog = await pages(apiBase, "v1/public/vaults", {}, get, signal);
  const vaults = catalog.filter(value => {
    const row = record(value);
    return row.contractType === "CDO_EPOCH" && row.visibility === "PUBLIC" && ["READY", "PAUSED", "BOOSTED"].includes(String(row.status));
  });
  const blocks: unknown[] = [];
  const epochs: unknown[] = [];
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(2, vaults.length) }, async () => {
    while (next < vaults.length) {
      const vault = record(vaults[next++]);
      const id = String(vault._id);
      if (typeof vault.address !== "string") throw new Error("Invalid public vault scope");
      const [vaultBlocks, vaultEpochs] = await Promise.all([
        pages(apiBase, "v1/public/vault-blocks", { vaultId: id, sort: "timestamp", order: "asc" }, get, signal),
        pages(apiBase, "v1/public/vault-epochs", { vaultAddress: vault.address, sort: "timestamp", order: "asc" }, get, signal),
      ]);
      if ([...vaultBlocks, ...vaultEpochs].some(value => record(value).vaultId !== id))
        throw new Error("Public history response violates requested vault scope");
      blocks.push(...vaultBlocks);
      epochs.push(...vaultEpochs);
      onProgress?.(`${String(vault.name)}: ${vaultBlocks.length} blocks, ${vaultEpochs.length} epochs`);
    }
  }));
  return aggregateCreditHistory({ vaults, blocks, epochs, retrievedAt: retrievedAt ?? new Date().toISOString() });
}
