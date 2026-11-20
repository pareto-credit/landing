import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const metadata = JSON.parse(
  readFileSync(
    new URL("../src/data/pageMetadata.json", import.meta.url),
    "utf8"
  )
);
const headBlock = /<!-- route-head:start -->[\s\S]*?<!-- route-head:end -->/;
const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        char
      ])
  );

export function renderPageDocument(html, path) {
  const page = metadata.pages[path];
  if (!page) throw new Error(`Unknown metadata route: ${path}`);
  if (!headBlock.test(html))
    throw new Error("Built HTML is missing the route-head placeholder");
  const url = `${metadata.siteUrl}${path === "/" ? "/" : `${path}/`}`;
  const image = `${metadata.siteUrl}/social/${page.image}`;
  const values = [
    ["name", "description", page.description],
    ["property", "og:type", "website"],
    ["property", "og:site_name", "Pareto"],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["property", "og:url", url],
    ["property", "og:image", image],
    ["property", "og:image:alt", page.imageAlt],
    ["property", "og:image:width", metadata.imageWidth],
    ["property", "og:image:height", metadata.imageHeight],
    ["property", "og:image:type", "image/png"],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
    ["name", "twitter:image", image],
    ["name", "twitter:image:alt", page.imageAlt],
  ];
  const tags = [
    `<title data-static-route-head>${escape(page.title)}</title>`,
    ...values.map(
      ([attr, name, content]) =>
        `<meta data-static-route-head ${attr}="${name}" content="${escape(
          content
        )}" />`
    ),
    `<link data-static-route-head rel="canonical" href="${escape(url)}" />`,
  ];
  return html.replace(
    headBlock,
    `<!-- route-head:start -->\n    ${tags.join(
      "\n    "
    )}\n    <!-- route-head:end -->`
  );
}

export function generatePageDocuments({
  distDir = resolve(process.cwd(), "dist"),
} = {}) {
  const template = readFileSync(resolve(distDir, "index.html"), "utf8");
  const files = [];
  for (const path of Object.keys(metadata.pages)) {
    const file = resolve(
      distDir,
      path === "/" ? "index.html" : `${path.slice(1)}/index.html`
    );
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, renderPageDocument(template, path));
    files.push(file);
  }
  // Retain SPA redirects for legacy links without advertising missing URLs as home.
  writeFileSync(
    resolve(distDir, "404.html"),
    template.replace(
      headBlock,
      '<!-- route-head:start --><title data-static-route-head>Page not found | Pareto</title><meta data-static-route-head name="robots" content="noindex" /><!-- route-head:end -->'
    )
  );
  return files;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  generatePageDocuments();
}
