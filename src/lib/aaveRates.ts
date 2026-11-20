import { unavailableProtocolRates, type ProtocolRate } from "./macroMarkets";

const ENDPOINT = "https://api.v3.aave.com/graphql";
const ETHEREUM_CORE = "0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2";
const ASSETS = {
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
} as const;

const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
const list = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? value.map(record) : [];
const data = (payload: unknown): Record<string, unknown> => {
  const root = record(payload);
  if (Array.isArray(root.errors) && root.errors.length)
    throw new Error("Aave rate query unavailable");
  return record(root.data);
};

// Aave's PercentValue.formatted is already in percentage points ("11" means 11%).
// Do not interpret raw ray values or infer units from the magnitude.
const percentage = (value: unknown): number | null => {
  if (typeof value !== "string" || !/^\d+(?:\.\d+)?$/.test(value.trim()))
    return null;
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
};

export function parseAaveRates(
  payload: unknown,
  retrievedAt: string
): ProtocolRate[] {
  const market = record(data(payload).market);
  if (
    String(market.address).toLowerCase() !== ETHEREUM_CORE ||
    record(market.chain).chainId !== 1 ||
    !Array.isArray(market.reserves)
  ) {
    throw new Error("Ethereum Core market observations unavailable");
  }
  return unavailableProtocolRates("Aave").map((rate) => {
    const matches = list(market.reserves).filter(
      (reserve) =>
        String(record(reserve.underlyingToken).address).toLowerCase() ===
        ASSETS[rate.asset]
    );
    if (matches.length > 1)
      throw new Error("Ambiguous Aave reserve observations");
    const reserve = matches[0] ?? {};
    return {
      ...rate,
      supplyApy: percentage(record(record(reserve.supplyInfo).apy).formatted),
      borrowApy: percentage(record(record(reserve.borrowInfo).apy).formatted),
      marketCount: matches.length,
      retrievedAt,
      coverage:
        "Aave V3 · Ethereum Core market · base APY, excluding incentives",
    };
  });
}

// Verified against the public Aave V3 API on 2026-10-29.
export const AAVE_RATES_QUERY = `query DashboardAaveRates($request: MarketRequest!) {
  market(request: $request) {
    address
    chain { chainId }
    reserves {
      underlyingToken { address symbol }
      supplyInfo { apy { formatted } }
      borrowInfo { apy { formatted } }
    }
  }
}`;

export async function fetchAaveRates(
  signal?: AbortSignal,
  get: typeof fetch = fetch
): Promise<ProtocolRate[]> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await get(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      signal: controller.signal,
      body: JSON.stringify({
        query: AAVE_RATES_QUERY,
        variables: { request: { address: ETHEREUM_CORE, chainId: 1 } },
      }),
    });
    if (!response.ok) throw new Error(`Aave returned HTTP ${response.status}`);
    const payload: unknown = await response.json();
    return parseAaveRates(payload, new Date().toISOString());
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}
