import { describe, expect, it, vi } from "vitest";
import type { Operator, Vault, VaultBlock } from "@idle-multiverse/data-access";
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
  }) as unknown as Vault;

describe("fetchProductsData", () => {
  it("derives a fixed-rate chip from the long description when the short description omits it", async () => {
    const apiClient = {
      vaults: {
        search: vi.fn().mockResolvedValue({
          data: [buildVault()],
          totalCount: 1,
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

    expect(productsData.vaults[0]?.type).toBe("Fixed rate");
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
      ]),
    );
  });
});
