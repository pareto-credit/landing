import type { Operator, Token, VaultBlock } from "@idle-multiverse/data-access";
import type { ProductVaultCard, ProductsDataPayload } from "../types/products";
import type {
  ParetoPublicApiClient,
  PublicVault as Vault,
} from "./paretoPublicApi";
import { batches, loadVaultFamilies, type VaultFamily } from "./vaultFamilies";

const COMPACT_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

// Vault latest blocks expose TVL.*USD values as 6-decimal USD base units.
// Always convert them directly; do not infer scaling from magnitude.
const VAULT_BLOCK_USD_BASE_UNITS = 1_000_000;

const getLocalizedText = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const englishValue = (value as { en?: unknown }).en;
  if (typeof englishValue === "string" && englishValue.trim())
    return englishValue;

  const firstTextValue = Object.values(value as Record<string, unknown>).find(
    (item) => typeof item === "string" && item.trim()
  );

  return typeof firstTextValue === "string" ? firstTextValue : "";
};

const sanitizeText = (text: string): string =>
  text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const fromVaultBlockUsdBaseUnits = (value: unknown): number | null => {
  const numericValue = toFiniteNumber(value);
  return numericValue === null
    ? null
    : numericValue / VAULT_BLOCK_USD_BASE_UNITS;
};

const normalizeOperatorCode = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const inferAssetFromVaultSymbol = (symbol?: string): string => {
  if (!symbol) return "—";

  const normalized = symbol.toUpperCase();
  const knownAssets = ["USDC", "USDT", "WETH", "WBTC", "ETH", "BTC", "USP"];
  const matchedAsset = knownAssets.find((asset) => normalized.includes(asset));

  if (matchedAsset) return matchedAsset;
  if (symbol.startsWith("$")) return symbol.slice(1);

  return symbol;
};

const toCadenceLabel = (value: string): string | null => {
  const normalized = value.toLowerCase().trim();

  if (normalized.includes("to")) return null;
  if (normalized.includes("weekly")) return "Weekly";
  if (normalized.includes("monthly")) return "Monthly";
  if (normalized.includes("daily")) return "Daily";
  if (normalized.includes("quarterly")) return "Quarterly";

  const monthMatch = normalized.match(/(\d+)\s*month/);
  if (monthMatch) {
    const months = Number(monthMatch[1]);
    if (months <= 1) return "Monthly";
    if (months <= 3) return "Quarterly";
    if (months <= 12) return `${months} months`;
    return "Yearly";
  }

  const dayMatch = normalized.match(/(\d+)\s*day/);
  if (dayMatch) {
    const days = Number(dayMatch[1]);
    if (days <= 8) return "Weekly";
    if (days <= 16) return "Bi-weekly";
    if (days <= 35) return "Monthly";
    if (days <= 95) return "Quarterly";
    return `${days} days`;
  }

  return null;
};

const getRateType = (vault: Vault): string | undefined => {
  if (vault.cdoEpoch?.mode === "CREDIT") return "Fixed rate";
  if (vault.cdoEpoch?.mode === "STRATEGY") return "Variable rate";

  const rateTypeSource = [
    getLocalizedText(vault.shortDescription),
    getLocalizedText(vault.description),
  ]
    .join(" ")
    .toLowerCase();

  if (
    rateTypeSource.includes("variable-rate") ||
    rateTypeSource.includes("variable rate")
  ) {
    return "Variable rate";
  }
  if (
    rateTypeSource.includes("fixed-rate") ||
    rateTypeSource.includes("fixed rate")
  ) {
    return "Fixed rate";
  }
  if (vault.contractType === "PARETO_DOLLAR") {
    return "Synthetic dollar";
  }
  return undefined;
};

const getRedemptions = (
  vault: Vault,
  latestBlock?: VaultBlock
): string | undefined => {
  const keyInfo = vault.keyInfo ?? [];
  const redemptionsInfo = keyInfo.find((item) =>
    /redeem|redemption|redemptions|redeeming time/i.test(
      getLocalizedText(item.label)
    )
  );
  if (redemptionsInfo) {
    const value = getLocalizedText(redemptionsInfo.value);
    return (toCadenceLabel(value) ?? value) || undefined;
  }

  const cycleInfo = keyInfo.find((item) =>
    /cycle duration/i.test(getLocalizedText(item.label))
  );
  if (cycleInfo) {
    const value = getLocalizedText(cycleInfo.value);
    return (toCadenceLabel(value) ?? value) || undefined;
  }

  const durationSeconds = latestBlock?.cdoEpoch?.duration;
  if (typeof durationSeconds === "number" && Number.isFinite(durationSeconds)) {
    const durationDays = Math.max(1, Math.round(durationSeconds / 86_400));
    return toCadenceLabel(`${durationDays} days`) ?? `${durationDays} days`;
  }

  return undefined;
};

const getLatestStatus = (vault: Vault, latestBlock?: VaultBlock): string => {
  const latestEpochStatus = latestBlock?.cdoEpoch?.status;
  if (typeof latestEpochStatus === "string" && latestEpochStatus.trim()) {
    return latestEpochStatus;
  }
  return vault.status;
};

const getApy = (vault: Vault, latestBlock?: VaultBlock): string => {
  if (vault.kyc?.hideSensitiveData) return "Hidden";
  const netApy = latestBlock?.APYs?.NET;
  if (typeof netApy !== "number" || !Number.isFinite(netApy)) return "—";
  return `${netApy.toFixed(2)}%`;
};

const getTvlUsd = (
  family: VaultFamily,
  latestByVaultId: Map<string, VaultBlock>
): number | null => {
  if (!family.complete || family.members.length === 0) return null;
  let totalUsd = 0;
  for (const member of family.members) {
    const latestBlock = latestByVaultId.get(member._id);
    if (
      latestBlock?.vaultAddress &&
      latestBlock.vaultAddress.toLowerCase() !== member.address.toLowerCase()
    )
      return null;
    const rawUsd = latestBlock?.TVL?.withRequestsUSD ?? latestBlock?.TVL?.USD;
    const usd = fromVaultBlockUsdBaseUnits(rawUsd);
    // A partial sibling sum would misstate the facility's combined TVL.
    if (usd === null) return null;
    totalUsd += usd;
  }

  return Number.isFinite(totalUsd) ? totalUsd : null;
};

const getBorrowerOperator = (
  vault: Vault,
  operatorsById: Map<string, Operator>
): Operator | null => {
  const borrowerId = vault.cdoEpoch?.borrower?.operatorId;
  if (borrowerId) return operatorsById.get(borrowerId) ?? null;

  const firstOperatorId = vault.operatorIds?.[0];
  if (firstOperatorId) return operatorsById.get(firstOperatorId) ?? null;

  return null;
};

const getCuratorOperator = (
  vault: Vault,
  operatorsById: Map<string, Operator>,
  operatorsByCode: Map<string, Operator>
): Operator | null => {
  const managerId = vault.cdoEpoch?.manager?.operatorId;
  if (managerId) return operatorsById.get(managerId) ?? null;

  if (vault.contractType === "PARETO_DOLLAR") {
    return operatorsByCode.get("pareto") ?? null;
  }

  return null;
};

const mapVaultToCard = (
  vault: Vault,
  latestByVaultId: Map<string, VaultBlock>,
  operatorsById: Map<string, Operator>,
  operatorsByCode: Map<string, Operator>,
  tokensById: Map<string, Token>,
  family: VaultFamily
): ProductVaultCard => {
  const latestBlock = latestByVaultId.get(vault._id);
  const borrowerOperator = getBorrowerOperator(vault, operatorsById);
  const curatorOperator = getCuratorOperator(
    vault,
    operatorsById,
    operatorsByCode
  );

  const subtitle = sanitizeText(getLocalizedText(vault.caption)) || undefined;
  const shortDescription = sanitizeText(
    getLocalizedText(vault.shortDescription)
  );
  const longDescription = sanitizeText(getLocalizedText(vault.description));
  const description = shortDescription || longDescription || undefined;
  const tokenSymbol = tokensById.get(vault.tokenId)?.symbol;
  const tvlUsd = getTvlUsd(family, latestByVaultId);
  const assets = [
    ...new Set(
      family.members
        .map(
          (member) =>
            tokensById.get(member.tokenId)?.symbol?.trim() ||
            inferAssetFromVaultSymbol(member.symbol)
        )
        .filter((asset) => asset !== "—")
    ),
  ];
  const familyRates = family.members.map((member) => {
    const block = latestByVaultId.get(member._id);
    if (
      block?.vaultAddress &&
      block.vaultAddress.toLowerCase() !== member.address.toLowerCase()
    )
      return "—";
    return getApy(member, block);
  });
  const hasFamily = (vault.siblings?.length ?? 0) > 0;
  const hasAllRates =
    family.complete &&
    family.members.length > 0 &&
    familyRates.every((rate) => rate !== "—" && rate !== "Hidden");
  const apy = !hasFamily
    ? getApy(vault, latestBlock)
    : !family.complete
    ? "—"
    : familyRates.includes("Hidden")
    ? "Hidden"
    : hasAllRates
    ? `${Math.max(
        ...family.members.map(
          (member) => latestByVaultId.get(member._id)?.APYs.NET ?? Number.NaN
        )
      ).toFixed(2)}%`
    : "—";

  return {
    id: vault._id,
    address: vault.address,
    name: vault.name,
    status: getLatestStatus(vault, latestBlock),
    apy,
    apyIsMaximum: family.members.length > 1 && hasAllRates,
    tvl: tvlUsd === null ? "—" : COMPACT_CURRENCY_FORMATTER.format(tvlUsd),
    tvlUsd,
    operatorName: borrowerOperator?.name ?? curatorOperator?.name,
    operatorCode: borrowerOperator?.code ?? curatorOperator?.code,
    curatorName: curatorOperator?.name,
    curatorCode: curatorOperator?.code,
    subtitle,
    description,
    redemptions: getRedemptions(vault, latestBlock),
    asset: tokenSymbol ?? inferAssetFromVaultSymbol(vault.symbol),
    assets,
    type: getRateType(vault),
    visibility: vault.visibility,
  };
};

export const fetchProductsData = async (
  apiClient: ParetoPublicApiClient
): Promise<ProductsDataPayload> => {
  const [vaultsResult, performancesResult, operatorsResult] =
    await Promise.allSettled([
      apiClient.vaults.search({
        status: "READY",
        contractType: "CDO_EPOCH",
      }),
      apiClient.vaults.performances({
        status: "READY",
      }),
      apiClient.operators.search({
        limit: 50,
      }),
    ]);

  if (vaultsResult.status !== "fulfilled") {
    throw vaultsResult.reason;
  }

  const vaultsPage = vaultsResult.value;
  const performances =
    performancesResult.status === "fulfilled" ? performancesResult.value : null;
  const operatorsPage =
    operatorsResult.status === "fulfilled"
      ? operatorsResult.value
      : { data: [], totalCount: 0 };

  const publicVaults = vaultsPage.data.filter(
    (vault) => String(vault.visibility).toUpperCase() === "PUBLIC"
  );
  const vaultIds = Array.from(
    new Set(
      publicVaults.flatMap((vault) => [
        vault._id,
        ...(vault.siblings?.map((sibling) => sibling._id) ?? []),
      ])
    )
  );
  const latestResults = await Promise.allSettled(
    batches(vaultIds, 100).map((vaultId) =>
      apiClient.vaultLatestBlocks.search({ vaultId, limit: 100 })
    )
  );
  const latestByVaultId = new Map(
    latestResults.flatMap((result) =>
      result.status === "fulfilled"
        ? result.value.data.map((block) => [block.vaultId, block] as const)
        : []
    )
  );
  const families = await loadVaultFamilies(
    publicVaults,
    apiClient,
    vaultsPage.data
  );
  const tokenIds = [
    ...new Set(
      [...families.values()].flatMap((family) =>
        family.members.map((member) => member.tokenId).filter(Boolean)
      )
    ),
  ];
  const tokensResults = await Promise.allSettled(
    batches(tokenIds, 50).map((_id) =>
      apiClient.tokens.search({ _id, limit: 50 })
    )
  );
  const tokensPage = {
    data: tokensResults.flatMap((result) =>
      result.status === "fulfilled" ? result.value.data : []
    ),
  };

  const operatorsById = new Map(
    operatorsPage.data.map((operator) => [operator._id, operator])
  );
  const operatorsByCode = new Map(
    operatorsPage.data.map((operator) => [
      normalizeOperatorCode(operator.code),
      operator,
    ])
  );
  const tokensById = new Map(
    tokensPage.data.map((token) => [token._id, token])
  );
  const outstandingLoans = toFiniteNumber(performances?.TVL);
  const creditExtended = toFiniteNumber(performances?.creditExtended);
  const vaults = publicVaults.map((vault) =>
    mapVaultToCard(
      vault,
      latestByVaultId,
      operatorsById,
      operatorsByCode,
      tokensById,
      families.get(vault._id)!
    )
  );

  return {
    // Preserve the numeric metrics contract; availability distinguishes a
    // compatibility placeholder from an explicitly reported zero.
    metrics: {
      // The performances route already returns normalized USD. Only raw
      // per-vault block values above use six-decimal base-unit conversion.
      outstandingLoans: outstandingLoans ?? 0,
      creditExtended: creditExtended ?? 0,
    },
    vaults,
    // APRs.AVG is already TVL weighted and reported in percentage points.
    weightedAverageApr: toFiniteNumber(performances?.APRs?.AVG),
    availability: {
      metrics: {
        outstandingLoans: outstandingLoans !== null,
        creditExtended: creditExtended !== null,
      },
      vaultTvl: vaults.every((vault) => vault.tvl !== "—"),
    },
  };
};
