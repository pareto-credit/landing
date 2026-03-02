import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FALLBACK_SYNTHETIC_DOLLAR_DATA } from "../data/syntheticDollar";
import { fetchSyntheticDollarData } from "../lib/syntheticDollarData";
import type { SyntheticDollarDataPayload } from "../types/syntheticDollar";
import { useApiClient } from "./useApiClient";

interface UseSyntheticDollarDataResult {
  data: SyntheticDollarDataPayload;
  isLoading: boolean;
  isUsingFallback: boolean;
}

const MIN_LOADING_TIME_MS = 900;

export const useSyntheticDollarData = (): UseSyntheticDollarDataResult => {
  const { client, isReady: isApiClientReady, error: apiClientError } = useApiClient();
  const [isMinLoadingDone, setIsMinLoadingDone] = useState(false);
  const canRunSyntheticDollarQuery = isApiClientReady && !!client && !apiClientError;

  useEffect(() => {
    if (!isApiClientReady) return;

    const timerId = window.setTimeout(() => setIsMinLoadingDone(true), MIN_LOADING_TIME_MS);
    return () => window.clearTimeout(timerId);
  }, [isApiClientReady]);

  const syntheticDollarQuery = useQuery({
    queryKey: ["synthetic-dollar-data"],
    enabled: canRunSyntheticDollarQuery,
    queryFn: () => fetchSyntheticDollarData(client!),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (!apiClientError && !syntheticDollarQuery.error) return;

    console.error("[useSyntheticDollarData] Falling back to static synthetic dollar data", {
      apiClientError,
      syntheticDollarDataError: syntheticDollarQuery.error,
    });
  }, [apiClientError, syntheticDollarQuery.error]);

  const data = syntheticDollarQuery.data ?? FALLBACK_SYNTHETIC_DOLLAR_DATA;
  const isUsingFallback = !!apiClientError || !!syntheticDollarQuery.error || !syntheticDollarQuery.data;
  const isQueryInitialLoading = canRunSyntheticDollarQuery ? syntheticDollarQuery.isPending : false;
  const isLoading = !isApiClientReady || !isMinLoadingDone || isQueryInitialLoading;

  return {
    data,
    isLoading,
    isUsingFallback,
  };
};

