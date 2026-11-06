import { useQuery } from "@tanstack/react-query";
import {
  fetchCreditHistory,
  type CreditHistoryPoint,
} from "../lib/creditHistory";

export interface UseCreditHistoryResult {
  points: CreditHistoryPoint[];
  source: string | null;
  asOf: string | null;
  isLoading: boolean;
  error: Error | null;
}

export function useCreditHistory(): UseCreditHistoryResult {
  const url =
    import.meta.env.VITE_PARETO_HISTORY_URL?.trim() ||
    `${import.meta.env.BASE_URL}data/credit-history.json`;
  const query = useQuery({
    queryKey: ["credit-history", url],
    queryFn: ({ signal }) =>
      fetchCreditHistory(
        url,
        AbortSignal.any([signal, AbortSignal.timeout(12_000)])
      ),
    staleTime: 15 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return {
    points: query.data?.points ?? [],
    source: query.data?.source ?? null,
    asOf: query.data?.asOf ?? null,
    isLoading: query.isPending,
    error: query.error,
  };
}
