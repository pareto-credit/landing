import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchAaveRates, parseAaveRates } from "./aaveRates";

const core = "0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2";
const usdc = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const retrievedAt = "2026-10-28T18:00:00Z";
const reserve = (
  address: string,
  supply: unknown,
  borrow: unknown,
  symbol = "USDC"
) => ({
  underlyingToken: { address, symbol },
  supplyInfo: { apy: { formatted: supply } },
  borrowInfo: { apy: { formatted: borrow } },
});
const payload = (reserves: unknown[] = []) => ({
  data: { market: { address: core, chain: { chainId: 1 }, reserves } },
});
const pendingRequest = () =>
  vi.fn<typeof fetch>((_url, init) =>
    new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;
      if (signal?.aborted) reject(signal.reason);
      else
        signal?.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        });
    })
  );

afterEach(() => vi.useRealTimers());

describe("Aave lending rates", () => {
  it("reads formatted percentages without multiplying them, preserving zero and unknown independently", () => {
    const rates = parseAaveRates(
      payload([
        reserve(usdc.toUpperCase(), "3.42", "4.51"),
        reserve(usdt, "0", null, "USDT"),
        reserve("0xunrelated", "99", "99"),
      ]),
      retrievedAt
    );
    expect(rates[0]).toMatchObject({
      protocol: "Aave",
      asset: "USDC",
      supplyApy: 3.42,
      borrowApy: 4.51,
      marketCount: 1,
      asOf: null,
      retrievedAt,
    });
    expect(rates[1]).toMatchObject({
      asset: "USDT",
      supplyApy: 0,
      borrowApy: null,
    });
    expect(parseAaveRates(payload(), retrievedAt)).toEqual([
      expect.objectContaining({
        asset: "USDC",
        supplyApy: null,
        borrowApy: null,
        marketCount: 0,
      }),
      expect.objectContaining({
        asset: "USDT",
        supplyApy: null,
        borrowApy: null,
        marketCount: 0,
      }),
    ]);
  });

  it("matches canonical asset addresses instead of token symbols", () => {
    const rates = parseAaveRates(
      payload([
        reserve("0xunrelated", "99", "99", "USDT"),
        reserve(usdc, null, "0", "unknown"),
      ]),
      retrievedAt
    );
    expect(rates[0]).toMatchObject({
      asset: "USDC",
      supplyApy: null,
      borrowApy: 0,
      marketCount: 1,
    });
    expect(rates[1]).toMatchObject({
      asset: "USDT",
      supplyApy: null,
      borrowApy: null,
      marketCount: 0,
    });
  });

  it("rejects GraphQL errors and a response for a different pool", () => {
    expect(() =>
      parseAaveRates({ errors: [{ message: "Unavailable" }] }, retrievedAt)
    ).toThrow();
    expect(() =>
      parseAaveRates(
        {
          data: {
            market: { address: "0xother", chain: { chainId: 1 }, reserves: [] },
          },
        },
        retrievedAt
      )
    ).toThrow();
  });

  it.each([10, undefined, "1"])(
    "rejects a market without the verified Ethereum chain ID: %s",
    (chainId) => {
      expect(() =>
        parseAaveRates(
          {
            data: {
              market: {
                address: core,
                chain: { chainId },
                reserves: [reserve(usdc, "2.5", "3.6")],
              },
            },
          },
          retrievedAt
        )
      ).toThrow();
    }
  );

  it("sends one verified read query directly for Ethereum Core", async () => {
    const get = vi.fn<typeof fetch>().mockResolvedValueOnce(
      Response.json(payload([reserve(usdc, "2.5", "3.6")]))
    );
    const rates = await fetchAaveRates(undefined, get);
    expect(rates[0].supplyApy).toBe(2.5);
    expect(rates[0].retrievedAt).toEqual(expect.any(String));
    expect(get).toHaveBeenCalledTimes(1);
    const [url, init] = get.mock.calls[0];
    expect(url).toBe("https://api.v3.aave.com/graphql");
    expect(init).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
    });
    const request = JSON.parse(String(init?.body));
    expect(request.variables.request).toEqual({ address: core, chainId: 1 });
    expect(request.query.replace(/\s+/g, " ").trim()).toBe(
      "query DashboardAaveRates($request: MarketRequest!) { market(request: $request) { address chain { chainId } reserves { underlyingToken { address symbol } supplyInfo { apy { formatted } } borrowInfo { apy { formatted } } } } }"
    );
  });

  it.each([
    ["HTTP failure", () => Promise.resolve(new Response(null, { status: 503 }))],
    [
      "GraphQL errors with partial data",
      () =>
        Promise.resolve(
          Response.json({
            ...payload([reserve(usdc, "99", "99")]),
            errors: [{ message: "Unavailable" }],
          })
        ),
    ],
    ["network failure", () => Promise.reject(new Error("Network unavailable"))],
  ])("rejects a failed source without returning rates: %s", async (_name, response) => {
    const get = vi.fn<typeof fetch>().mockImplementationOnce(response);
    await expect(fetchAaveRates(undefined, get)).rejects.toThrow();
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("forwards caller cancellation to the request", async () => {
    const controller = new AbortController();
    const get = pendingRequest();
    const result = fetchAaveRates(controller.signal, get);
    const rejected = expect(result).rejects.toMatchObject({ name: "AbortError" });
    controller.abort();
    await rejected;
    expect(get.mock.calls[0][1]?.signal?.aborted).toBe(true);
  });

  it("preserves an already aborted caller signal", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      fetchAaveRates(controller.signal, pendingRequest())
    ).rejects.toMatchObject({ name: "AbortError" });
  });

  it("aborts a stalled source after twelve seconds", async () => {
    vi.useFakeTimers();
    const get = pendingRequest();
    const result = fetchAaveRates(undefined, get);
    const rejected = expect(result).rejects.toMatchObject({ name: "AbortError" });
    await vi.advanceTimersByTimeAsync(11_999);
    expect(get.mock.calls[0][1]?.signal?.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    await rejected;
  });

  it.each([200, 503])("cleans up cancellation after HTTP %s", async (status) => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const get = vi.fn<typeof fetch>().mockResolvedValueOnce(
      Response.json(payload([reserve(usdc, "2.5", "3.6")]), { status })
    );
    const result = fetchAaveRates(controller.signal, get);
    if (status === 200) await result;
    else await expect(result).rejects.toThrow();
    await vi.advanceTimersByTimeAsync(12_000);
    controller.abort();
    expect(get.mock.calls[0][1]?.signal?.aborted).toBe(false);
  });
});
