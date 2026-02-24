import { useEffect, useMemo, useState, type ReactNode } from "react";
import * as dataAccessModule from "@idle-multiverse/data-access";
import type { ApiClient as ApiClientType } from "@idle-multiverse/data-access";
import { ApiClientContext } from "../contexts/ApiClientContext";

type ApiClientConstructor = new (apiUrl: string, token: string) => ApiClientType;

const findApiClientConstructor = (module: unknown): ApiClientConstructor | null => {
  const moduleRecord = module as Record<string, unknown>;
  const candidates = [
    moduleRecord.ApiClient,
    (moduleRecord.default as { ApiClient?: unknown } | undefined)?.ApiClient,
    (moduleRecord.default as { default?: unknown } | undefined)?.default,
    (moduleRecord.default as { default?: { ApiClient?: unknown } } | undefined)?.default
      ?.ApiClient,
    moduleRecord.default,
  ];

  const resolved = candidates.find((candidate) => typeof candidate === "function");
  return resolved ? (resolved as ApiClientConstructor) : null;
};

const resolveApiClientConstructor = (): ApiClientConstructor => {
  const mainResolved = findApiClientConstructor(dataAccessModule);
  if (mainResolved) return mainResolved;

  const availableMainKeys =
    Object.keys(dataAccessModule as Record<string, unknown>).join(", ") || "none";
  throw new Error(
    `ApiClient export not found (main keys: ${availableMainKeys})`,
  );
};

export const ApiClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<ApiClientType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isUnmounted = false;

    const setupApiClient = async () => {
      try {
        const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;
        const accessToken = import.meta.env.PUBLIC_API_ACCESS_TOKEN;

        if (!endpoint || !accessToken) {
          throw new Error("Missing PUBLIC_API_ENDPOINT or PUBLIC_API_ACCESS_TOKEN");
        }

        const ApiClient = resolveApiClientConstructor();
        if (isUnmounted) return;

        setClient(new ApiClient(endpoint, accessToken));
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
