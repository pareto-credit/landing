export interface MarketObservation {
  value: number | null;
  asOf: string | null;
}
export interface BenchmarkRates {
  sofr30d: MarketObservation;
  sofr: MarketObservation;
  effr: MarketObservation;
}
export interface TreasuryRates {
  twoYear: MarketObservation;
  tenYear: MarketObservation;
}
export function treasuryCurveSlopeBps(rates?: TreasuryRates): number | null {
  if (
    rates?.twoYear.value == null ||
    rates.tenYear.value == null ||
    !rates.twoYear.asOf ||
    rates.twoYear.asOf !== rates.tenYear.asOf
  )
    return null;
  return (rates.tenYear.value - rates.twoYear.value) * 100;
}
export interface ProtocolRate {
  protocol: "Aave" | "Morpho";
  asset: "USDC" | "USDT";
  supplyApy: number | null;
  borrowApy: number | null;
  asOf: string | null;
  retrievedAt: string | null;
  marketCount: number;
  coverage: string;
  sourceUrl: string;
  isLoading?: boolean;
}

export const MACRO_SOURCES = {
  nyFed: {
    name: "New York Fed",
    url: "https://www.newyorkfed.org/markets/reference-rates",
  },
  treasury: {
    name: "U.S. Treasury",
    url: "https://home.treasury.gov/resource-center-data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve",
  },
} as const;

export const MACRO_ENDPOINTS = {
  nyFed: "https://markets.newyorkfed.org/api/rates/all/latest.json",
  treasury:
    "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve",
  morpho: "https://api.morpho.org/graphql",
} as const;

const ASSETS = {
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
} as const;
const REQUEST_TIMEOUT_MS = 12_000;
const missing = (): MarketObservation => ({ value: null, asOf: null });
const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
const number = (value: unknown): number | null => {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
};
const validDate = (value: unknown): string | null => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(value))
    return null;
  const day = value.slice(0, 10);
  const date = new Date(`${day}T00:00:00Z`);
  return Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === day
    ? day
    : null;
};
const observation = (value: unknown, date: unknown): MarketObservation => {
  const parsed = number(value);
  const asOf = validDate(date);
  return parsed === null || !asOf ? missing() : { value: parsed, asOf };
};

export function parseBenchmarkRates(payload: unknown): BenchmarkRates {
  const rows = record(payload).refRates;
  if (!Array.isArray(rows) || !rows.length)
    throw new Error("Reference-rate observations unavailable");
  const latest = (type: string, field: string): MarketObservation => {
    const row = rows
      .map(record)
      .filter((item) => item.type === type && validDate(item.effectiveDate))
      .sort((a, b) =>
        String(b.effectiveDate).localeCompare(String(a.effectiveDate))
      )[0];
    return row ? observation(row[field], row.effectiveDate) : missing();
  };
  return {
    sofr30d: latest("SOFRAI", "average30day"),
    sofr: latest("SOFR", "percentRate"),
    effr: latest("EFFR", "percentRate"),
  };
}

export function parseTreasuryRates(xml: string): TreasuryRates {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  if (document.getElementsByTagName("parsererror").length)
    throw new Error("Invalid Treasury XML");
  const dates = Array.from(document.getElementsByTagName("*")).filter(
    (element) =>
      element.localName === "NEW_DATE" && validDate(element.textContent)
  );
  const latest = dates.sort((a, b) =>
    (b.textContent ?? "").localeCompare(a.textContent ?? "")
  )[0];
  if (!latest?.parentElement)
    throw new Error("Treasury observations unavailable");
  const fields = Array.from(latest.parentElement.children);
  const value = (name: string) =>
    fields.find((element) => element.localName === name)?.textContent;
  return {
    twoYear: observation(value("BC_2YEAR"), latest.textContent),
    tenYear: observation(value("BC_10YEAR"), latest.textContent),
  };
}

async function request<T>(
  url: string,
  parse: (response: Response) => Promise<T>,
  signal?: AbortSignal,
  init?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      credentials: "omit",
    });
    if (!response.ok)
      throw new Error(`Market source returned HTTP ${response.status}`);
    return await parse(response);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

export async function fetchBenchmarkRates(
  signal?: AbortSignal
): Promise<BenchmarkRates> {
  return request(
    MACRO_ENDPOINTS.nyFed,
    async (response) => parseBenchmarkRates(await response.json()),
    signal
  );
}

export async function fetchTreasuryRates(
  signal?: AbortSignal
): Promise<TreasuryRates> {
  return request(
    `${
      MACRO_ENDPOINTS.treasury
    }&field_tdr_date_value=${new Date().getUTCFullYear()}`,
    async (response) => parseTreasuryRates(await response.text()),
    signal
  );
}

export function unavailableProtocolRates(
  protocol: ProtocolRate["protocol"]
): ProtocolRate[] {
  return (["USDC", "USDT"] as const).map((asset) => ({
    protocol,
    asset,
    supplyApy: null,
    borrowApy: null,
    asOf: null,
    retrievedAt: null,
    marketCount: 0,
    coverage:
      protocol === "Aave"
        ? "Aave V3 · Ethereum Core market"
        : "Top 100 listed Ethereum markets by supplied USD · base APY, excluding rewards",
    sourceUrl:
      protocol === "Aave"
        ? "https://app.aave.com/"
        : "https://app.morpho.org/ethereum/markets",
  }));
}

export const MORPHO_RATES_QUERY = `query DashboardMorphoRates {
  markets(first: 100, orderBy: SupplyAssetsUsd, orderDirection: Desc, where: { chainId_in: [1], listed: true }) {
    items { marketId loanAsset { address symbol } state { supplyApy borrowApy supplyAssetsUsd borrowAssetsUsd } }
  }
}`;

export function parseMorphoRates(
  payload: unknown,
  retrievedAt: string
): ProtocolRate[] {
  const root = record(payload);
  if (Array.isArray(root.errors) && root.errors.length)
    throw new Error("Morpho rate query unavailable");
  const items = record(record(root.data).markets).items;
  if (!Array.isArray(items))
    throw new Error("Morpho market observations unavailable");
  return unavailableProtocolRates("Morpho").map((rate) => {
    const markets = items
      .map(record)
      .filter(
        (item) =>
          String(record(item.loanAsset).address).toLowerCase() ===
          ASSETS[rate.asset]
      );
    const weightedApy = (
      apyField: string,
      weightField: string
    ): number | null => {
      let total = 0;
      let weighted = 0;
      for (const market of markets) {
        const state = record(market.state);
        const weight = number(state[weightField]);
        const apy = number(state[apyField]);
        if (weight === null || weight < 0 || (weight > 0 && apy === null))
          return null;
        if (weight > 0 && apy !== null) {
          total += weight;
          weighted += weight * apy;
        }
      }
      return total > 0 ? (weighted / total) * 100 : null;
    };
    return {
      ...rate,
      supplyApy: weightedApy("supplyApy", "supplyAssetsUsd"),
      borrowApy: weightedApy("borrowApy", "borrowAssetsUsd"),
      marketCount: markets.length,
      retrievedAt,
      coverage: `Top 100 listed Ethereum markets by supplied USD · ${markets.length} ${rate.asset} markets · supply / borrow USD-weighted base APY, excluding rewards`,
    };
  });
}

export async function fetchMorphoRates(
  signal?: AbortSignal
): Promise<ProtocolRate[]> {
  return request(
    MACRO_ENDPOINTS.morpho,
    async (response) =>
      parseMorphoRates(await response.json(), new Date().toISOString()),
    signal,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: MORPHO_RATES_QUERY }),
    }
  );
}
