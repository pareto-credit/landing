export type SyntheticToken = "USP" | "sUSP";

export interface SyntheticDollarStat {
  label: string;
  value: string;
}

export interface SyntheticDollarTokenData {
  stats: SyntheticDollarStat[];
}

export type SyntheticDollarDataPayload = Record<SyntheticToken, SyntheticDollarTokenData>;

