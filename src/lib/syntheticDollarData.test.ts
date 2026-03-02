import { describe, expect, it, vi } from "vitest";
import type { ApiClient, VaultBlock } from "@idle-multiverse/data-access";
import {
  SYNTHETIC_DOLLAR_VAULT_ID,
  fetchSyntheticDollarData,
  mapVaultBlockToSyntheticDollarData,
} from "./syntheticDollarData";

const buildVaultBlock = (): VaultBlock =>
  ({
    totalSupply: "3700000000000000000000000",
    price: "1080000000000000000",
    APYs: {
      BASE: 0,
      NET: 8.567,
    },
    APRs: {
      BASE: 0,
    },
    paretoDollar: {
      staking: {
        totalAssets: "2900000000000000000000000",
      },
    },
  }) as VaultBlock;

describe("mapVaultBlockToSyntheticDollarData", () => {
  it("formats USP and sUSP live stats from the latest vault block", () => {
    const data = mapVaultBlockToSyntheticDollarData(buildVaultBlock());

    expect(data.USP.stats).toEqual([
      { label: "Price", value: "$1.00" },
      { label: "TVL", value: "$3.7M" },
      { label: "Collateralization", value: "100%" },
    ]);
    expect(data.sUSP.stats).toEqual([
      { label: "Price", value: "$1.08" },
      { label: "TVL", value: "$2.9M" },
      { label: "APY", value: "8.57%" },
    ]);
  });
});

describe("fetchSyntheticDollarData", () => {
  it("reads the configured synthetic dollar vault latest block", async () => {
    const readOne = vi.fn().mockResolvedValue(buildVaultBlock());
    const apiClient = {
      vaultLatestBlocks: {
        readOne,
      },
    } as unknown as ApiClient;

    await fetchSyntheticDollarData(apiClient);

    expect(readOne).toHaveBeenCalledWith({ vaultId: SYNTHETIC_DOLLAR_VAULT_ID });
  });
});
