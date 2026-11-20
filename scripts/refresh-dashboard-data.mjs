import { readFile, writeFile, rename, mkdir, mkdtemp, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { transpileModule, ModuleKind, ScriptTarget } from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));

export async function refreshDashboardData({ get = fetch, onProgress = () => {}, outputPath = resolve(root, "public/data/credit-history.json") } = {}) {
  // This standalone TypeScript module has type-only imports. Compile it using
  // the project's existing TypeScript dependency; no extra runtime is required.
  const source = await readFile(resolve(root, "src/lib/aggregateCreditHistory.ts"), "utf8");
  const compiled = transpileModule(source, { compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 } }).outputText;
  const runtimeDirectory = await mkdtemp(join(tmpdir(), "pareto-history-runtime-"));
  let feed;
  try {
    const runtimeFile = join(runtimeDirectory, "aggregate.mjs");
    await writeFile(runtimeFile, compiled);
    const { fetchAggregateCreditHistory } = await import(pathToFileURL(runtimeFile).href);
    feed = await fetchAggregateCreditHistory({ get, onProgress });
  } finally {
    await rm(runtimeDirectory, { recursive: true, force: true });
  }
  if (!feed.points.some(point => point.creditExtendedUsd !== null) || !feed.points.some(point => point.tvlUsd !== null))
    throw new Error("Aggregate history has no usable observations");
  const temporary = `${outputPath}.${Date.now()}.tmp`;
  await mkdir(dirname(outputPath), { recursive: true });
  try {
    await writeFile(temporary, `${JSON.stringify(feed, null, 2)}\n`);
    await rename(temporary, outputPath);
  } finally {
    await rm(temporary, { force: true });
  }
  return { asOf: feed.asOf, retrievedAt: feed.retrievedAt, points: feed.points.length, vaults: feed.scope.vaultIds.length, latest: feed.points.at(-1) };
}

if (typeof process !== "undefined" && process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  refreshDashboardData({ onProgress: message => console.log(message) })
    .then(result => console.log(JSON.stringify(result, null, 2)))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}
