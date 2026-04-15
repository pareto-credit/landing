import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function ensureGitHubPagesFallback({
  distDir = resolve(process.cwd(), "dist"),
  indexFileName = "index.html",
  fallbackFileName = "404.html",
} = {}) {
  const indexPath = resolve(distDir, indexFileName);
  const fallbackPath = resolve(distDir, fallbackFileName);

  if (!existsSync(indexPath)) {
    throw new Error(`Cannot create GitHub Pages fallback because ${indexPath} does not exist.`);
  }

  copyFileSync(indexPath, fallbackPath);

  return {
    indexPath,
    fallbackPath,
  };
}

const isExecutedDirectly =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isExecutedDirectly) {
  ensureGitHubPagesFallback();
}
