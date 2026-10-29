export interface VanityMetrics {
  outstandingLoans: number;
  creditExtended: number;
}

export interface ProductsDataAvailability {
  metrics: Record<keyof VanityMetrics, boolean>;
  /** True only when TVL is known for every listed vault and its related vaults. */
  vaultTvl: boolean;
}

export type ProductVaultStatus = string;

export interface ProductVaultCard {
  id: string;
  address: string;
  name: string;
  status: ProductVaultStatus;
  apy: string;
  tvl: string;
  /** Normalized USD value for ordering; null means unknown, zero is a real value. */
  tvlUsd?: number | null;
  operatorName?: string;
  operatorCode?: string;
  curatorName?: string;
  curatorCode?: string;
  subtitle?: string;
  description?: string;
  redemptions?: string;
  asset: string;
  type?: string;
  visibility: string;
}

export interface ProductsDataPayload {
  metrics: VanityMetrics;
  vaults: ProductVaultCard[];
  /** API-reported TVL-weighted APR in percentage points; null means unavailable. */
  weightedAverageApr?: number | null;
  /** Missing metadata must not be interpreted as proof that values are available. */
  availability?: ProductsDataAvailability;
}
