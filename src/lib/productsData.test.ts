import { describe, expect, it, vi } from "vitest";
import type {
  Operator,
  Token,
  Vault,
  VaultBlock,
  VaultsPerformances,
} from "@idle-multiverse/data-access";
import { fetchProductsData } from "./productsData";
import type { ParetoPublicApiClient } from "./paretoPublicApi";

const buildVault = (overrides: Partial<Vault> = {}): Vault =>
  ({
    _id: "vault-falconx",
    address: "0x123",
    name: "FalconX",
    status: "READY",
    contractType: "CDO_EPOCH",
    visibility: "PUBLIC",
    tokenId: "token-usdc",
    symbol: "AA_FalconXUSDC",
    shortDescription: {
      en: "Lending funds to an SPV managed by a top-tier Prime Broker",
    },
    description: {
      en: "The vault is re-priced every 30 days at a fixed rate for institutional lenders.",
    },
    caption: {
      en: "Prime brokerage",
    },
    keyInfo: [],
    ...overrides,
  } as unknown as Vault);

const buildPerformances = (
  overrides: Partial<VaultsPerformances> = {}
): VaultsPerformances => ({
  TVL: "150000000",
  creditExtended: "1400000000",
  tokens: [],
  chains: [],
  APRs: { MAX: 8, MIN: 8, AVG: 8 },
  vaults: 1,
  ...overrides,
});

const buildApiClient = (): ParetoPublicApiClient => ({
  vaults: {
    search: vi.fn().mockResolvedValue({ data: [buildVault()], totalCount: 1 }),
    performances: vi.fn().mockResolvedValue(buildPerformances()),
  },
  operators: { search: vi.fn().mockResolvedValue({ data: [], totalCount: 0 }) },
  vaultLatestBlocks: {
    search: vi.fn().mockResolvedValue({
      data: [{ vaultId: "vault-falconx", TVL: { USD: "0" }, APYs: { NET: 8 } }],
      totalCount: 1,
    }),
    readOne: vi.fn(),
  },
  tokens: {
    search: vi
      .fn()
      .mockResolvedValue({
        data: [{ _id: "token-usdc", symbol: "USDC" }],
        totalCount: 1,
      }),
  },
});

describe("fetchProductsData", () => {
  it("uses the API's TVL-weighted APR without deriving it from displayed vault APYs", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.performances).mockResolvedValue(
      buildPerformances({ APRs: { MIN: 2, MAX: 10, AVG: 6.375 } })
    );

    const data = await fetchProductsData(client);

    expect(data.weightedAverageApr).toBe(6.375);
    expect(data.vaults[0].apy).toBe("8.00%");
  });

  it.each([0, "0"])("preserves the reported weighted APR %s as a real zero", async (value) => {
    const client = buildApiClient();
    vi.mocked(client.vaults.performances).mockResolvedValue({
      ...buildPerformances(),
      APRs: { MIN: 0, MAX: 0, AVG: value },
    } as unknown as VaultsPerformances);

    expect((await fetchProductsData(client)).weightedAverageApr).toBe(0);
  });

  it.each([undefined, null, "", "not-a-number", Number.NaN, Infinity])(
    "keeps missing or invalid reported weighted APR %s unavailable",
    async (value) => {
      const client = buildApiClient();
      vi.mocked(client.vaults.performances).mockResolvedValue({
        ...buildPerformances(),
        APRs: { MIN: 0, MAX: 0, AVG: value },
      } as unknown as VaultsPerformances);

      expect((await fetchProductsData(client)).weightedAverageApr).toBeNull();
    }
  );

  it("keeps an absent APRs aggregate unavailable", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.performances).mockResolvedValue({
      ...buildPerformances(),
      APRs: undefined,
    } as unknown as VaultsPerformances);

    expect((await fetchProductsData(client)).weightedAverageApr).toBeNull();
  });

  it("loads operator and asset metadata within the public catalog request limit", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.search).mockResolvedValue({
      data: [buildVault({ operatorIds: ["operator-falconx"] })],
      totalCount: 1,
    });
    vi.mocked(client.operators.search).mockImplementation(async (params) => {
      if ((params?.limit ?? 0) > 50) throw new Error("HTTP 400: limit exceeds 50");
      return {
        data: [{ _id: "operator-falconx", name: "FalconX Operator", code: "falconx" } as Operator],
        totalCount: 1,
      };
    });
    vi.mocked(client.tokens.search).mockImplementation(async (params) => {
      if ((params?.limit ?? 0) > 50) throw new Error("HTTP 400: limit exceeds 50");
      return {
        data: [{ _id: "token-usdc", symbol: "USDT" } as Token],
        totalCount: 1,
      };
    });

    const data = await fetchProductsData(client);

    expect(data.vaults[0]).toMatchObject({
      operatorName: "FalconX Operator",
      asset: "USDT",
    });
  });

  it("keeps large normalized protocol USD totals without rescaling by magnitude", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.performances).mockResolvedValue(buildPerformances({ TVL: "1200000000000", creditExtended: "3400000000000" }));
    const data = await fetchProductsData(client);
    expect(data.metrics).toEqual({ outstandingLoans: 1_200_000_000_000, creditExtended: 3_400_000_000_000 });
  });

  it("marks failed performance aggregates unavailable while retaining the real vault listing", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.performances).mockRejectedValue(
      new Error("Performance service unavailable")
    );

    const data = await fetchProductsData(client);

    expect(data.availability?.metrics).toEqual({
      outstandingLoans: false,
      creditExtended: false,
    });
    expect(data.weightedAverageApr).toBeNull();
    expect(data.vaults).toEqual([
      expect.objectContaining({
        id: "vault-falconx",
        name: "FalconX",
        tvl: "$0",
      }),
    ]);
  });

  it.each([undefined, null, "", Number.NaN, Infinity])(
    "tracks invalid aggregate %s independently from an actual zero",
    async (value) => {
      const client = buildApiClient();
      vi.mocked(client.vaults.performances).mockResolvedValue({
        ...buildPerformances({ TVL: "0" }),
        creditExtended: value,
      } as unknown as VaultsPerformances);

      const data = await fetchProductsData(client);

      expect(data.availability?.metrics).toEqual({
        outstandingLoans: true,
        creditExtended: false,
      });
      expect(data.metrics.outstandingLoans).toBe(0);
    }
  );

  it.each(["rejected", "missing"])(
    "marks %s latest blocks as unknown TVL rather than zero",
    async (state) => {
      const client = buildApiClient();
      if (state === "rejected") {
        vi.mocked(client.vaultLatestBlocks.search).mockRejectedValue(
          new Error("Latest blocks unavailable")
        );
      } else {
        vi.mocked(client.vaultLatestBlocks.search).mockResolvedValue({
          data: [],
          totalCount: 0,
        });
      }

      const data = await fetchProductsData(client);

      expect(data.vaults[0]).toMatchObject({
        id: "vault-falconx",
        tvl: "—",
        apy: "—",
      });
      expect(data.availability?.vaultTvl).toBe(false);
      expect(data.metrics.outstandingLoans).toBe(150_000_000);
    }
  );

  it.each([null, "", "not-a-number", Infinity])(
    "rejects invalid latest-block TVL %s",
    async (value) => {
      const client = buildApiClient();
      vi.mocked(client.vaultLatestBlocks.search).mockResolvedValue({
        data: [
          {
            vaultId: "vault-falconx",
            TVL: { USD: value },
          } as unknown as VaultBlock,
        ],
        totalCount: 1,
      });

      const data = await fetchProductsData(client);

      expect(data.vaults[0].tvl).toBe("—");
      expect(data.availability?.vaultTvl).toBe(false);
    }
  );

  it("keeps explicit zero aggregates and latest-block TVL available", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.performances).mockResolvedValue(
      buildPerformances({ TVL: "0", creditExtended: "0" })
    );

    const data = await fetchProductsData(client);

    expect(data.metrics).toEqual({ outstandingLoans: 0, creditExtended: 0 });
    expect(data.vaults[0].tvl).toBe("$0");
    expect(data.vaults[0].tvlUsd).toBe(0);
    expect(data.availability).toEqual({
      metrics: { outstandingLoans: true, creditExtended: true },
      vaultTvl: true,
    });
  });

  it("requires TVL for every related vault before displaying the combined value", async () => {
    const client = buildApiClient();
    vi.mocked(client.vaults.search).mockResolvedValue({
      data: [buildVault({ siblings: [buildVault({ _id: "vault-sibling" })] })],
      totalCount: 1,
    });

    const incomplete = await fetchProductsData(client);
    expect(incomplete.vaults[0].tvl).toBe("—");
    expect(incomplete.vaults[0].tvlUsd).toBeNull();
    expect(incomplete.availability?.vaultTvl).toBe(false);

    vi.mocked(client.vaultLatestBlocks.search).mockResolvedValue({
      data: [
        { vaultId: "vault-falconx", TVL: { USD: "2000000000000" } },
        { vaultId: "vault-sibling", TVL: { USD: "3000000000000" } },
      ] as VaultBlock[],
      totalCount: 2,
    });

    const complete = await fetchProductsData(client);
    expect(complete.vaults[0].tvl).toBe("$5M");
    expect(complete.vaults[0].tvlUsd).toBe(5_000_000);
    expect(complete.availability?.vaultTvl).toBe(true);
  });

  it("derives rate chips from cdoEpoch mode instead of description wording", async () => {
    const twoPrimeVault = buildVault({
      name: "Two Prime Axiom WBTC Yield",
      shortDescription: {
        en: "Institutional bitcoin-backed lending and investment strategies.",
      },
      description: {
        en: "Serving corporate treasuries, miners, and institutional allocators.",
      },
      cdoEpoch: {
        address: "0xtwoprimeepoch",
        mode: "CREDIT",
        borrower: {
          address: "0xborrower",
          operatorId: "operator-two-prime",
        },
        manager: {
          address: "0xmanager",
          operatorId: "operator-northbridge",
        },
      },
    } as Partial<Vault>);
    const strategyVault = buildVault({
      _id: "vault-strategy",
      name: "Strategy Vault",
      shortDescription: {
        en: "A fixed-rate phrase that must not override the vault mode.",
      },
      cdoEpoch: {
        address: "0xstrategyepoch",
        mode: "STRATEGY",
        borrower: {
          address: "0xstrategyborrower",
          operatorId: "operator-strategy",
        },
        manager: {
          address: "0xmanager",
          operatorId: "operator-pareto",
        },
      },
    } as Partial<Vault>);
    const apiClient = {
      vaults: {
        search: vi.fn().mockResolvedValue({
          data: [twoPrimeVault, strategyVault],
          totalCount: 2,
        }),
        performances: vi.fn().mockResolvedValue({
          TVL: 0,
          creditExtended: 0,
        }),
      },
      operators: {
        search: vi.fn().mockResolvedValue({
          data: [],
          totalCount: 0,
        }),
      },
      vaultLatestBlocks: {
        search: vi.fn().mockResolvedValue({
          data: [],
          totalCount: 0,
        }),
      },
      tokens: {
        search: vi.fn().mockResolvedValue({
          data: [
            {
              _id: "token-usdc",
              symbol: "USDC",
            },
          ],
          totalCount: 1,
        }),
      },
    } as unknown as ParetoPublicApiClient;

    const productsData = await fetchProductsData(apiClient);

    expect(productsData.vaults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Two Prime Axiom WBTC Yield",
          type: "Fixed rate",
        }),
        expect.objectContaining({
          name: "Strategy Vault",
          type: "Variable rate",
        }),
      ])
    );
  });

  it("formats latest block TVLs from 6-decimal USD base units regardless of magnitude", async () => {
    const m1Vault = buildVault({
      _id: "vault-m1",
      name: "M1 Capital",
      symbol: "pM1_USDC",
      cdoEpoch: {
        borrower: {
          address: "0xborrower",
          operatorId: "operator-m1",
        },
        manager: {
          address: "0xmanager",
          operatorId: "operator-pareto",
        },
      },
    } as Partial<Vault>);
    const rockawayVault = buildVault({
      _id: "vault-rockaway",
      name: "RockawayX",
      symbol: "pRX_USDC",
      cdoEpoch: {
        borrower: {
          address: "0xborrower2",
          operatorId: "operator-rockaway",
        },
        manager: {
          address: "0xmanager",
          operatorId: "operator-pareto",
        },
      },
    } as Partial<Vault>);
    const m1Operator = {
      _id: "operator-m1",
      name: "M1 Capital",
      code: "m1capital",
    } as Operator;
    const rockawayOperator = {
      _id: "operator-rockaway",
      name: "RockawayX",
      code: "rockawayx",
    } as Operator;
    const paretoOperator = {
      _id: "operator-pareto",
      name: "Pareto",
      code: "pareto",
    } as Operator;
    const m1LatestBlock = {
      vaultId: "vault-m1",
      TVL: {
        token: "250100102447",
        USD: "250100102447",
        withRequestsToken: "250100102447",
        withRequestsUSD: "250100102447",
      },
      APYs: {
        NET: 5.54114493,
      },
    } as VaultBlock;
    const rockawayLatestBlock = {
      vaultId: "vault-rockaway",
      TVL: {
        token: "20655447210914",
        USD: "20655447210914",
        withRequestsToken: "20655447210914",
        withRequestsUSD: "20655447210914",
      },
      APYs: {
        NET: 6.49,
      },
    } as VaultBlock;
    const apiClient = {
      vaults: {
        search: vi.fn().mockResolvedValue({
          data: [m1Vault, rockawayVault],
          totalCount: 2,
        }),
        performances: vi.fn().mockResolvedValue({
          TVL: 0,
          creditExtended: 0,
        }),
      },
      operators: {
        search: vi.fn().mockResolvedValue({
          data: [m1Operator, rockawayOperator, paretoOperator],
          totalCount: 3,
        }),
      },
      vaultLatestBlocks: {
        search: vi.fn().mockResolvedValue({
          data: [m1LatestBlock, rockawayLatestBlock],
          totalCount: 2,
        }),
      },
      tokens: {
        search: vi.fn().mockResolvedValue({
          data: [
            {
              _id: "token-usdc",
              symbol: "USDC",
              decimals: 6,
            },
          ],
          totalCount: 1,
        }),
      },
    } as unknown as ParetoPublicApiClient;

    const productsData = await fetchProductsData(apiClient);

    expect(productsData.vaults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "M1 Capital",
          tvl: "$250.1K",
          operatorCode: "m1capital",
          curatorCode: "pareto",
        }),
        expect.objectContaining({
          name: "RockawayX",
          tvl: "$20.7M",
          operatorCode: "rockawayx",
          curatorCode: "pareto",
        }),
      ])
    );
  });
});
