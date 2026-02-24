import type {
  ApiClient as ApiClientType,
  Operator,
  Token,
  Vault,
  VaultBlock,
} from "@idle-multiverse/data-access";
import type { ProductVaultCard, ProductsDataPayload } from "../types/products";

const COMPACT_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

const getLocalizedText = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const englishValue = (value as { en?: unknown }).en;
  if (typeof englishValue === "string" && englishValue.trim()) return englishValue;

  const firstTextValue = Object.values(value as Record<string, unknown>).find(
    (item) => typeof item === "string" && item.trim(),
  );

  return typeof firstTextValue === "string" ? firstTextValue : "";
};

const sanitizeText = (text: string): string =>
  text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const toNumberSafe = (value: unknown): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const normalizeUsdValue = (value: number): number =>
  value > 1_000_000_000_000 ? value / 1_000_000 : value;

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
  const shortDescription = getLocalizedText(vault.shortDescription).toLowerCase();
  if (shortDescription.includes("variable-rate") || shortDescription.includes("variable rate")) {
    return "Variable rate";
  }
  if (shortDescription.includes("fixed-rate") || shortDescription.includes("fixed rate")) {
    return "Fixed rate";
  }
  if (vault.contractType === "PARETO_DOLLAR") {
    return "Synthetic dollar";
  }
  return undefined;
};

const getRedemptions = (vault: Vault, latestBlock?: VaultBlock): string | undefined => {
  const keyInfo = vault.keyInfo ?? [];
  const redemptionsInfo = keyInfo.find((item) =>
    /redeem|redemption|redemptions|redeeming time/i.test(getLocalizedText(item.label)),
  );
  if (redemptionsInfo) {
    const value = getLocalizedText(redemptionsInfo.value);
    return (toCadenceLabel(value) ?? value) || undefined;
  }

  const cycleInfo = keyInfo.find((item) =>
    /cycle duration/i.test(getLocalizedText(item.label)),
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

const getTvl = (vault: Vault, latestByVaultId: Map<string, VaultBlock>): string => {
  const relatedVaultIds = [vault._id, ...(vault.siblings?.map((item) => item._id) ?? [])];
  const totalRawUsd = relatedVaultIds.reduce((acc, vaultId) => {
    const latestBlock = latestByVaultId.get(vaultId);
    if (!latestBlock?.TVL) return acc;
    const rawUsd = latestBlock.TVL.withRequestsUSD ?? latestBlock.TVL.USD;
    return acc + toNumberSafe(rawUsd);
  }, 0);

  return COMPACT_CURRENCY_FORMATTER.format(normalizeUsdValue(totalRawUsd));
};

const getBorrowerOperator = (vault: Vault, operatorsById: Map<string, Operator>): Operator | null => {
  const borrowerId = vault.cdoEpoch?.borrower?.operatorId;
  if (borrowerId) return operatorsById.get(borrowerId) ?? null;

  const firstOperatorId = vault.operatorIds?.[0];
  if (firstOperatorId) return operatorsById.get(firstOperatorId) ?? null;

  return null;
};

const getCuratorOperator = (
  vault: Vault,
  operatorsById: Map<string, Operator>,
  operatorsByCode: Map<string, Operator>,
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
): ProductVaultCard => {
  const latestBlock = latestByVaultId.get(vault._id);
  const borrowerOperator = getBorrowerOperator(vault, operatorsById);
  const curatorOperator = getCuratorOperator(vault, operatorsById, operatorsByCode);

  const subtitle = sanitizeText(getLocalizedText(vault.caption)) || undefined;
  const shortDescription = sanitizeText(getLocalizedText(vault.shortDescription));
  const longDescription = sanitizeText(getLocalizedText(vault.description));
  const description = shortDescription || longDescription || undefined;
  const tokenSymbol = tokensById.get(vault.tokenId)?.symbol;

  return {
    id: vault._id,
    address: vault.address,
    name: vault.name,
    status: getLatestStatus(vault, latestBlock),
    apy: getApy(vault, latestBlock),
    tvl: getTvl(vault, latestByVaultId),
    operatorName: borrowerOperator?.name ?? curatorOperator?.name,
    operatorCode: borrowerOperator?.code ?? curatorOperator?.code,
    curatorName: curatorOperator?.name,
    curatorCode: curatorOperator?.code,
    subtitle,
    description,
    redemptions: getRedemptions(vault, latestBlock),
    asset: tokenSymbol ?? inferAssetFromVaultSymbol(vault.symbol),
    type: getRateType(vault),
    visibility: vault.visibility,
  };
};

export const fetchProductsData = async (
  apiClient: ApiClientType,
): Promise<ProductsDataPayload> => {
  const [vaultsResult, performancesResult, operatorsResult] = await Promise.allSettled([
    apiClient.vaults.search({
      status: "READY",
      contractType: "CDO_EPOCH",
    }),
    apiClient.vaults.performances({
      status: "READY",
    }),
    apiClient.operators.search({
      limit: 100,
    }),
  ]);

  if (vaultsResult.status !== "fulfilled") {
    throw vaultsResult.reason;
  }

  const vaultsPage = vaultsResult.value;
  const performances =
    performancesResult.status === "fulfilled"
      ? performancesResult.value
      : { TVL: 0, creditExtended: 0 };
  const operatorsPage =
    operatorsResult.status === "fulfilled"
      ? operatorsResult.value
      : { data: [], totalCount: 0 };

  const publicVaults = vaultsPage.data.filter(
    (vault) => String(vault.visibility).toUpperCase() === "PUBLIC",
  );
  const vaultIds = Array.from(
    new Set(
      publicVaults.flatMap((vault) => [
        vault._id,
        ...(vault.siblings?.map((sibling) => sibling._id) ?? []),
      ]),
    ),
  );
  const tokenIds = Array.from(new Set(publicVaults.map((vault) => vault.tokenId).filter(Boolean)));

  const [latestBlocksResult, tokensResult] = await Promise.allSettled([
    vaultIds.length > 0
      ? apiClient.vaultLatestBlocks.search({
          vaultId: vaultIds,
        })
      : Promise.resolve({ data: [], totalCount: 0 }),
    tokenIds.length > 0
      ? apiClient.tokens.search({
          _id: tokenIds,
          limit: 100,
        })
      : Promise.resolve({ data: [], totalCount: 0 }),
  ]);

  const latestBlocksPage =
    latestBlocksResult.status === "fulfilled"
      ? latestBlocksResult.value
      : { data: [], totalCount: 0 };
  const tokensPage =
    tokensResult.status === "fulfilled" ? tokensResult.value : { data: [], totalCount: 0 };

  const latestByVaultId = new Map(
    latestBlocksPage.data.map((latestBlock) => [latestBlock.vaultId, latestBlock]),
  );
  const operatorsById = new Map(operatorsPage.data.map((operator) => [operator._id, operator]));
  const operatorsByCode = new Map(
    operatorsPage.data.map((operator) => [normalizeOperatorCode(operator.code), operator]),
  );
  const tokensById = new Map(tokensPage.data.map((token) => [token._id, token]));

  return {
    metrics: {
      outstandingLoans: normalizeUsdValue(toNumberSafe(performances.TVL)),
      creditExtended: normalizeUsdValue(toNumberSafe(performances.creditExtended)),
    },
    vaults: publicVaults.map((vault) =>
      mapVaultToCard(vault, latestByVaultId, operatorsById, operatorsByCode, tokensById),
    ),
  };
};
