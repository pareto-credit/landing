/** Keep bookmarks to sections of the former audience pages useful. */
const legacySections: Record<string, string> = {
  participation: "framework",
  "getting-started": "framework",
  operations: "hero",
  products: "hero",
  problem: "benefits",
  comparison: "framework",
  paths: "framework",
  "how-it-works": "framework",
  proof: "experience",
  plans: "framework",
};

export const resolveLegacyAudienceHash = (hash: string) =>
  legacySections[hash] ?? hash;
