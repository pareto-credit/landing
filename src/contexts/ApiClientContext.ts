import { createContext } from "react";
import type { ApiClient as ApiClientType } from "@idle-multiverse/data-access";

export interface ApiClientContextValue {
  client: ApiClientType | null;
  isReady: boolean;
  error: Error | null;
}

export const ApiClientContext = createContext<ApiClientContextValue | null>(null);
