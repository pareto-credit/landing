import { describe, expect, it, vi } from "vitest";
import type { ApiClient, Vault } from "@idle-multiverse/data-access";
import { fetchProductsData } from "./productsData";

const buildVault = (): Vault =>
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
    } as unknown as ApiClient;

    const productsData = await fetchProductsData(apiClient);

    expect(productsData.vaults[0]?.type).toBe("Fixed rate");
  });
});
