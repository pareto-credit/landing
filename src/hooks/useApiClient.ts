import { useContext } from "react";
import { ApiClientContext, type ApiClientContextValue } from "../contexts/ApiClientContext";

export const useApiClient = (): ApiClientContextValue => {
  const context = useContext(ApiClientContext);

  if (!context) {
    throw new Error("useApiClient must be used within ApiClientProvider");
  }

  return context;
};
