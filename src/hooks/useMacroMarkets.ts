import { useQuery } from "@tanstack/react-query";
import {
  fetchBenchmarkRates,
  fetchMorphoRates,
  fetchTreasuryRates,
  unavailableProtocolRates,
} from "../lib/macroMarkets";
import { fetchAaveRates } from "../lib/aaveRates";

const queryOptions = {
  staleTime: 5 * 60_000,
  gcTime: 30 * 60_000,
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

export function useBenchmarkRates() {
  return useQuery({
    queryKey: ["macro-markets", "ny-fed"],
    queryFn: ({ signal }) => fetchBenchmarkRates(signal),
    ...queryOptions,
  });
}

export function useMacroMarkets() {
  const benchmarks = useBenchmarkRates();
  const treasury = useQuery({
    queryKey: ["macro-markets", "treasury"],
    queryFn: ({ signal }) => fetchTreasuryRates(signal),
    ...queryOptions,
  });
  const aave = useQuery({
    queryKey: ["macro-markets", "aave-ethereum-core"],
    queryFn: ({ signal }) => fetchAaveRates(signal),
    ...queryOptions,
  });
  const morpho = useQuery({
    queryKey: ["macro-markets", "morpho-ethereum"],
    queryFn: ({ signal }) => fetchMorphoRates(signal),
    ...queryOptions,
  });
  return {
    benchmarks,
    treasury,
    protocolRates: [
      ...(aave.data ?? unavailableProtocolRates("Aave")).map((rate) => ({
        ...rate,
        isLoading: aave.isPending,
      })),
      ...(morpho.data ?? unavailableProtocolRates("Morpho")).map((rate) => ({
        ...rate,
        isLoading: morpho.isPending,
      })),
    ],
  };
}
