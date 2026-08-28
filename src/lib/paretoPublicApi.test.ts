import { describe, expect, it, vi } from "vitest";
import { createParetoPublicApiClient } from "./paretoPublicApi";

describe("createParetoPublicApiClient", () => {
  it("requests Pareto public routes without an authorization header", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ data: [], totalCount: 0 }),
    });
    const client = createParetoPublicApiClient(
      "https://api.pareto.credit/",
      fetchMock as typeof fetch,
    );

    await client.vaults.search({ status: "READY", contractType: "CDO_EPOCH" });
    await client.vaults.performances({ status: "READY" });
    await client.operators.search({ limit: 100 });
    await client.vaultLatestBlocks.search({ vaultId: ["vault-a", "vault-b"] });
    await client.tokens.search({ _id: ["token-a", "token-b"], limit: 100 });

    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      "https://api.pareto.credit/v1/public/vaults?status=READY&contractType=CDO_EPOCH",
      "https://api.pareto.credit/v1/public/vaults/performances?status=READY",
      "https://api.pareto.credit/v1/public/operators?limit=100",
      "https://api.pareto.credit/v1/public/vault-latest-blocks?vaultId=vault-a%2Cvault-b",
      "https://api.pareto.credit/v1/public/tokens?_id=token-a%2Ctoken-b&limit=100",
    ]);

    for (const [, options] of fetchMock.mock.calls) {
      expect(new Headers(options?.headers).has("Authorization")).toBe(false);
    }
  });
});
