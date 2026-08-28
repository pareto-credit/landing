import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ApiClientContext } from "../contexts/ApiClientContext";
import {
  createParetoPublicApiClient,
  type ParetoPublicApiClient,
} from "../lib/paretoPublicApi";

export const ApiClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<ParetoPublicApiClient | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isUnmounted = false;

    const setupApiClient = async () => {
      try {
        const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;

        if (!endpoint) {
          throw new Error("Missing PUBLIC_API_ENDPOINT");
        }

        if (isUnmounted) return;

        setClient(createParetoPublicApiClient(endpoint));
      } catch (setupError) {
        if (isUnmounted) return;

        const normalizedError =
          setupError instanceof Error ? setupError : new Error("Failed to initialize ApiClient");
        setError(normalizedError);

        if (import.meta.env.DEV) {
          console.error("[ApiClientProvider] Initialization failed", normalizedError);
        }
      } finally {
        if (!isUnmounted) {
          setIsReady(true);
        }
      }
    };

    void setupApiClient();

    return () => {
      isUnmounted = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      client,
      error,
      isReady,
    }),
    [client, error, isReady],
  );

  return <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;
};
