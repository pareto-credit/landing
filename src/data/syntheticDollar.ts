import type { SyntheticDollarDataPayload } from "../types/syntheticDollar";

const FALLBACK_USP_TVL = 3_600_000;
const FALLBACK_SUSP_TVL = 2_800_000;

const formatCoverageRatio = (suspTvl: number, uspTvl: number): string =>
  `${Math.floor((suspTvl / uspTvl) * 100)}%`;

export const FALLBACK_SYNTHETIC_DOLLAR_DATA: SyntheticDollarDataPayload = {
  USP: {
    stats: [
      { label: "Price", value: "$1.00" },
      { label: "TVL", value: "$3.6M" },
      {
        label: "Coverage",
        value: formatCoverageRatio(FALLBACK_SUSP_TVL, FALLBACK_USP_TVL),
      },
    ],
  },
  sUSP: {
    stats: [
      { label: "Price", value: "$1.08" },
      { label: "TVL", value: "$2.8M" },
      { label: "APY", value: "8.18%" },
    ],
  },
};
