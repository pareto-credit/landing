import type {
  ApiClient as ApiClientType,
  VaultBlock,
} from "@idle-multiverse/data-access";
import type { SyntheticDollarDataPayload } from "../types/syntheticDollar";

export const SYNTHETIC_DOLLAR_VAULT_ID = "68026ee6905992e056c85a75";

const WAD_DECIMALS = 1e18;
const USP_PRICE = 1;

const COMPACT_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const fromWad = (value: unknown): number | null => {
  const parsed = toFiniteNumber(value);
  return parsed === null ? null : parsed / WAD_DECIMALS;
};

const formatCompactUsd = (value: number | null): string =>
  value === null ? "—" : COMPACT_CURRENCY_FORMATTER.format(value);

const formatUsd = (value: number | null): string =>
  value === null ? "—" : USD_FORMATTER.format(value);

const formatPercent = (value: unknown): string => {
  const parsed = toFiniteNumber(value);
  return parsed === null ? "—" : `${parsed.toFixed(2)}%`;
};

const formatCoverageRatio = (
  uspTvl: number | null,
  suspTvl: number | null,
): string => {
  if (
    uspTvl === null ||
    suspTvl === null ||
    uspTvl <= 0 ||
    !Number.isFinite(uspTvl) ||
    !Number.isFinite(suspTvl)
  ) {
    return "—";
  }

  return `${Math.floor((suspTvl / uspTvl) * 100)}%`;
};

export const mapVaultBlockToSyntheticDollarData = (
  vaultBlock: VaultBlock,
): SyntheticDollarDataPayload => {
  const uspTvl = fromWad(vaultBlock.totalSupply);
  const suspTvl = fromWad(vaultBlock.paretoDollar?.staking?.totalAssets);

  return {
    USP: {
      stats: [
        { label: "Price", value: formatUsd(USP_PRICE) },
        { label: "TVL", value: formatCompactUsd(uspTvl) },
        {
          label: "Coverage",
          value: formatCoverageRatio(uspTvl, suspTvl),
        },
      ],
    },
    sUSP: {
      stats: [
        { label: "Price", value: formatUsd(fromWad(vaultBlock.price)) },
        {
          label: "TVL",
          value: formatCompactUsd(suspTvl),
        },
        { label: "APY", value: formatPercent(vaultBlock.APYs?.NET) },
      ],
    },
  };
};

export const fetchSyntheticDollarData = async (
  apiClient: ApiClientType,
): Promise<SyntheticDollarDataPayload> => {
  const latestVaultBlock = await apiClient.vaultLatestBlocks.readOne({
    vaultId: SYNTHETIC_DOLLAR_VAULT_ID,
  });

  return mapVaultBlockToSyntheticDollarData(latestVaultBlock);
};
