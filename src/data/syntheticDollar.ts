import type { SyntheticDollarDataPayload } from "../types/syntheticDollar";

export const FALLBACK_SYNTHETIC_DOLLAR_DATA: SyntheticDollarDataPayload = {
  USP: {
    stats: [
      { label: "Price", value: "$1.00" },
      { label: "TVL", value: "$3.7M" },
      { label: "Collateralization", value: "100%" },
    ],
  },
  sUSP: {
    stats: [
      { label: "Price", value: "$1.08" },
      { label: "TVL", value: "$2.9M" },
      { label: "APY", value: "8.57%" },
    ],
  },
};

