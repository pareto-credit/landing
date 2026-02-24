import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FALLBACK_PRODUCTS_DATA } from "../data/products";
import { fetchProductsData } from "../lib/productsData";
import { useApiClient } from "./useApiClient";
import type { ProductVaultCard, VanityMetrics } from "../types/products";

interface UseProductsDataResult {
  metrics: VanityMetrics;
  vaults: ProductVaultCard[];
  isLoading: boolean;
  isUsingFallback: boolean;
}

const MIN_LOADING_TIME_MS = 900;

export const useProductsData = (): UseProductsDataResult => {
  const { client, isReady: isApiClientReady, error: apiClientError } = useApiClient();
  const [isMinLoadingDone, setIsMinLoadingDone] = useState(false);
  const canRunProductsQuery = isApiClientReady && !!client && !apiClientError;

  useEffect(() => {
    if (!isApiClientReady) return;

    const timerId = window.setTimeout(() => setIsMinLoadingDone(true), MIN_LOADING_TIME_MS);
    return () => window.clearTimeout(timerId);
  }, [isApiClientReady]);

  const productsQuery = useQuery({
    queryKey: ["products-data"],
    enabled: canRunProductsQuery,
    queryFn: () => fetchProductsData(client!),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (!apiClientError && !productsQuery.error) return;

    console.error("[useProductsData] Falling back to static products data", {
      apiClientError,
      productsDataError: productsQuery.error,
    });
  }, [apiClientError, productsQuery.error]);

  const hasLiveVaults = (productsQuery.data?.vaults.length ?? 0) > 0;
  const metrics = productsQuery.data?.metrics ?? FALLBACK_PRODUCTS_DATA.metrics;
  const vaults = hasLiveVaults ? productsQuery.data!.vaults : FALLBACK_PRODUCTS_DATA.vaults;
  const isUsingFallback =
    !!apiClientError || !!productsQuery.error || !productsQuery.data || !hasLiveVaults;

  const isQueryInitialLoading = canRunProductsQuery ? productsQuery.isPending : false;
  const isLoading = !isApiClientReady || !isMinLoadingDone || isQueryInitialLoading;

  return {
    metrics,
    vaults,
    isLoading,
    isUsingFallback,
  };
};
