import metadata from "../data/pageMetadata.json";

export type MetadataPath = keyof typeof metadata.pages;

/** Directory-backed static pages resolve to these canonical URLs on GitHub Pages. */
export const pageHead = (path: MetadataPath) => {
  const page = metadata.pages[path];
  const url = `${metadata.siteUrl}${path === "/" ? "/" : `${path}/`}`;
  const image = `${metadata.siteUrl}/social/${page.image}`;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Pareto" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: page.imageAlt },
      { property: "og:image:width", content: String(metadata.imageWidth) },
      { property: "og:image:height", content: String(metadata.imageHeight) },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: page.imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
};

/** Initial crawler-visible tags give way to the router's managed tags on boot. */
export const clearStaticRouteHead = (doc: Document) => {
  doc.head
    .querySelectorAll("[data-static-route-head]")
    .forEach((tag) => tag.remove());
};
