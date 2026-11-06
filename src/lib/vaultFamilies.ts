import type {
  ParetoPublicApiClient,
  PublicVault as Vault,
} from "./paretoPublicApi";

export interface VaultFamily {
  members: Vault[];
  complete: boolean;
}

export const batches = <T>(items: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, (index + 1) * size)
  );

const isPublished = (vault: Vault) =>
  vault.status === "READY" &&
  (vault.visibility === "PUBLIC" || vault.visibility === "LIMITED");

/** Resolves configured sibling families directly from the public catalog. */
export async function loadVaultFamilies(
  vaults: Vault[],
  apiClient: ParetoPublicApiClient,
  catalog: Vault[] = vaults
): Promise<Map<string, VaultFamily>> {
  const known = new Map(catalog.map((vault) => [vault._id, vault]));
  const references = vaults.flatMap((vault) => vault.siblings ?? []);
  for (const reference of references) {
    const embedded = reference as Partial<Vault>;
    if (
      !known.has(reference._id) &&
      embedded.address &&
      embedded.tokenId &&
      embedded.status &&
      embedded.visibility
    ) {
      known.set(reference._id, embedded as Vault);
    }
  }
  const missingIds = [...new Set(references.map((item) => item._id))].filter(
    (id) => !known.has(id)
  );
  const requested = new Set(missingIds);
  const catalogResults = await Promise.allSettled(
    batches(missingIds, 50).map((_id) =>
      apiClient.vaults.search({ _id, limit: 50 })
    )
  );
  for (const result of catalogResults) {
    if (result.status !== "fulfilled") continue;
    for (const vault of result.value.data) {
      if (requested.has(vault._id)) known.set(vault._id, vault);
    }
  }

  return new Map(
    vaults.map((vault) => {
      const ids = [
        ...new Set([
          vault._id,
          ...(vault.siblings ?? []).map((item) => item._id),
        ]),
      ];
      const seenAddresses = new Set<string>();
      const members = ids.flatMap((id) => {
        const member = known.get(id);
        if (!member || !isPublished(member)) return [];
        const address = member.address.toLowerCase();
        if (seenAddresses.has(address)) return [];
        seenAddresses.add(address);
        return [member];
      });
      return [
        vault._id,
        { members, complete: ids.every((id) => known.has(id)) },
      ];
    })
  );
}
