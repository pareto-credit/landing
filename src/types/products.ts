export interface VanityMetrics {
  outstandingLoans: number;
  creditExtended: number;
}

export type ProductVaultStatus = string;

export interface ProductVaultCard {
  id: string;
  address: string;
  name: string;
  status: ProductVaultStatus;
  apy: string;
  tvl: string;
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
}
