import type {
  Operator,
  OperatorsSearchQuery,
  Page,
  Token,
  TokensSearchQuery,
  Vault,
  VaultBlock,
  VaultBlocksSearchQuery,
  VaultsPerformances,
  VaultsPerformancesQuery,
  VaultsSearchQuery,
} from "@idle-multiverse/data-access";

type QueryValue = string | number | boolean | readonly (string | number | boolean)[];
type Query = Record<string, QueryValue | null | undefined>;

export interface ParetoPublicApiClient {
  vaults: {
    search: (params?: VaultsSearchQuery) => Promise<Page<Vault>>;
    performances: (params?: VaultsPerformancesQuery) => Promise<VaultsPerformances>;
  };
  operators: {
    search: (params?: OperatorsSearchQuery) => Promise<Page<Operator>>;
  };
  vaultLatestBlocks: {
    search: (params?: VaultBlocksSearchQuery) => Promise<Page<VaultBlock>>;
    readOne: (params: VaultBlocksSearchQuery) => Promise<VaultBlock>;
  };
  tokens: {
    search: (params?: TokensSearchQuery) => Promise<Page<Token>>;
  };
}

const PUBLIC_ROUTES = {
  vaults: "v1/public/vaults",
  vaultPerformances: "v1/public/vaults/performances",
  operators: "v1/public/operators",
  vaultLatestBlocks: "v1/public/vault-latest-blocks",
  tokens: "v1/public/tokens",
} as const;

const buildUrl = (apiUrl: string, route: string, params?: Query): URL => {
  const baseUrl = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
  const url = new URL(route, baseUrl);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined || value === null) continue;
    url.searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value));
  }

  return url;
};

const requestJson = async <T>(
  fetchImplementation: typeof fetch,
  apiUrl: string,
  route: string,
  params?: Query,
): Promise<T> => {
  const url = buildUrl(apiUrl, route, params);
  const response = await fetchImplementation(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Pareto public API request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
};

export const createParetoPublicApiClient = (
  apiUrl: string,
  fetchImplementation: typeof fetch = fetch,
): ParetoPublicApiClient => {
  const get = <T>(route: string, params?: Query): Promise<T> =>
    requestJson<T>(fetchImplementation, apiUrl, route, params);

  const searchLatestBlocks = (params?: VaultBlocksSearchQuery) =>
    get<Page<VaultBlock>>(PUBLIC_ROUTES.vaultLatestBlocks, params as Query | undefined);

  return {
    vaults: {
      search: (params) => get<Page<Vault>>(PUBLIC_ROUTES.vaults, params as Query | undefined),
      performances: (params) =>
        get<VaultsPerformances>(PUBLIC_ROUTES.vaultPerformances, params as Query | undefined),
    },
    operators: {
      search: (params) =>
        get<Page<Operator>>(PUBLIC_ROUTES.operators, params as Query | undefined),
    },
    vaultLatestBlocks: {
      search: searchLatestBlocks,
      readOne: async (params) => {
        const page = await searchLatestBlocks(params);
        const latestBlock = page.data[0];

        if (!latestBlock) throw new Error("Pareto public API resource not found");
        return latestBlock;
      },
    },
    tokens: {
      search: (params) => get<Page<Token>>(PUBLIC_ROUTES.tokens, params as Query | undefined),
    },
  };
};
