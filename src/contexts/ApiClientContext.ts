import { createContext } from "react";
import type { ParetoPublicApiClient } from "../lib/paretoPublicApi";

export interface ApiClientContextValue {
  client: ParetoPublicApiClient | null;
  isReady: boolean;
  error: Error | null;
}

export const ApiClientContext = createContext<ApiClientContextValue | null>(null);
