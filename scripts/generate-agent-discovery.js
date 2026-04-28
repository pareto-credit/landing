import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_SITE_URL = "https://pareto.credit";
export const API_BASE_URL = "https://api.pareto.credit";
export const API_DOCS_URL = "https://docs.pareto.credit/developers/api";

const PUBLIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
];

const API_RESOURCES = [
  "campaigns",
  "chains",
  "operators",
  "token-blocks",
  "tokens",
  "transactions",
  "vaults",
  "vault-blocks",
  "vault-categories",
  "vault-epochs",
  "vault-performances",
  "vault-types",
];

const ensureTrailingSlash = (url) => (url.endsWith("/") ? url.slice(0, -1) : url);

const canonicalUrl = (siteUrl, path) =>
  `${ensureTrailingSlash(siteUrl)}${path === "/" ? "/" : path}`;

const writeTextFile = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${content.trimEnd()}\n`, "utf8");
};

const formatXmlDate = (date) => date.toISOString().slice(0, 10);

const generateRobotsTxt = (siteUrl) => {
  const sitemapUrl = canonicalUrl(siteUrl, "/sitemap.xml");
  const contentSignal = "Content-Signal: ai-train=no, search=yes, ai-input=yes";

  return [
    "User-agent: *",
    "Allow: /",
    "Allow: /privacy-policy",
    "Allow: /terms-of-service",
    "Allow: /.well-known/",
    "Allow: /sitemap.xml",
    "Allow: /openapi.json",
    "Disallow: /?showBanknote=",
    contentSignal,
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    contentSignal,
    "",
    "User-agent: Claude-Web",
    "Allow: /",
    contentSignal,
    "",
    "User-agent: GPTBot",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    "User-agent: Google-Extended",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    "User-agent: Amazonbot",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    "User-agent: anthropic-ai",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    "User-agent: Bytespider",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    "User-agent: CCBot",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    "User-agent: Applebot-Extended",
    "Disallow: /",
    "Content-Signal: ai-train=no, search=no, ai-input=no",
    "",
    `Sitemap: ${sitemapUrl}`,
  ].join("\n");
};

const generateSitemapXml = (siteUrl, date) => {
  const lastmod = formatXmlDate(date);
  const urls = PUBLIC_PAGES.map(
    (page) => `  <url>
    <loc>${canonicalUrl(siteUrl, page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

const generateHomepageMarkdown = (siteUrl) => `# Pareto

Pareto builds transparent credit infrastructure with enterprise-grade compliance for modern capital markets.

## Primary Pages

- [Home](${canonicalUrl(siteUrl, "/")})
- [Privacy Policy](${canonicalUrl(siteUrl, "/privacy-policy")})
- [Terms of Service](${canonicalUrl(siteUrl, "/terms-of-service")})

## Product Areas

- Tokenized credit vaults for institutional credit products
- USP synthetic dollar products
- White-label and studio tooling for credit infrastructure
- Ecosystem, operator, documentation, governance, and developer resources

## Developer Resources

- [API documentation](${API_DOCS_URL})
- [OpenAPI description](${canonicalUrl(siteUrl, "/openapi.json")})
- [API catalog](${canonicalUrl(siteUrl, "/.well-known/api-catalog")})
- [Sitemap](${canonicalUrl(siteUrl, "/sitemap.xml")})

## Contact

- Email: info@pareto.credit
- Web app: https://app.pareto.credit/
- Documentation: https://docs.pareto.credit/
`;

const generateApiCatalog = (siteUrl) =>
  JSON.stringify(
    {
      linkset: [
        {
          anchor: `${API_BASE_URL}/`,
          "service-desc": [
            {
              href: canonicalUrl(siteUrl, "/openapi.json"),
              type: "application/openapi+json",
            },
          ],
          "service-doc": [
            {
              href: API_DOCS_URL,
              type: "text/html",
            },
          ],
          status: [
            {
              href: canonicalUrl(siteUrl, "/health"),
              type: "application/json",
            },
          ],
        },
      ],
    },
    null,
    2,
  );

const schemaForListResponse = (resourceName) => ({
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: true,
      },
    },
    totalCount: {
      type: "integer",
      minimum: 0,
    },
  },
  required: ["data"],
  title: `${resourceName} list response`,
});

const generateOpenApi = () => {
  const paths = Object.fromEntries(
    API_RESOURCES.map((resource) => [
      `/${resource}`,
      {
        get: {
          summary: `List ${resource}`,
          tags: [resource],
          security: [{ bearerApiKey: [] }],
          responses: {
            200: {
              description: `A list of ${resource}`,
              content: {
                "application/json": {
                  schema: schemaForListResponse(resource),
                },
              },
            },
            401: {
              description: "Missing or invalid API key",
            },
          },
        },
      },
    ]),
  );

  return JSON.stringify(
    {
      openapi: "3.1.0",
      info: {
        title: "Pareto API",
        version: "1.0.0",
        description:
          "Public discovery description for the Pareto API. Full endpoint details are maintained in the Pareto developer documentation.",
      },
      servers: [{ url: `${API_BASE_URL}/v1` }],
      externalDocs: {
        description: "Pareto API documentation",
        url: API_DOCS_URL,
      },
      security: [{ bearerApiKey: [] }],
      components: {
        securitySchemes: {
          bearerApiKey: {
            type: "http",
            scheme: "bearer",
            description:
              "API keys are issued after approval and sent in the Authorization header as a Bearer token.",
          },
        },
      },
      paths,
    },
    null,
    2,
  );
};

const generateHealth = (date) =>
  JSON.stringify(
    {
      status: "ok",
      service: "pareto-landing",
      generatedAt: date.toISOString(),
    },
    null,
    2,
  );

const generateOAuthProtectedResource = () =>
  JSON.stringify(
    {
      resource: `${API_BASE_URL}/`,
      authorization_servers: [],
      scopes_supported: [
        "read:campaigns",
        "read:chains",
        "read:operators",
        "read:tokens",
        "read:vaults",
      ],
      bearer_methods_supported: ["header"],
      resource_documentation: API_DOCS_URL,
      api_key_documentation: API_DOCS_URL,
    },
    null,
    2,
  );

const generateMcpServerCard = (siteUrl) =>
  JSON.stringify(
    {
      serverInfo: {
        name: "pareto-site",
        version: "1.0.0",
        description:
          "Pareto site discovery card for agents. Browser-based tools are exposed through WebMCP on the homepage.",
      },
      transport: {
        type: "streamable-http",
        endpoint: canonicalUrl(siteUrl, "/mcp"),
      },
      capabilities: {
        tools: {
          listChanged: false,
        },
        resources: {
          subscribe: false,
          listChanged: false,
        },
        prompts: {
          listChanged: false,
        },
      },
    },
    null,
    2,
  );

const generateSiteSkill = (siteUrl) => `# Pareto Agent Discovery

Use this skill when an agent needs to discover Pareto public pages, developer documentation, or API metadata.

## Resources

- Homepage: ${canonicalUrl(siteUrl, "/")}
- Sitemap: ${canonicalUrl(siteUrl, "/sitemap.xml")}
- Robots policy: ${canonicalUrl(siteUrl, "/robots.txt")}
- API catalog: ${canonicalUrl(siteUrl, "/.well-known/api-catalog")}
- OpenAPI description: ${canonicalUrl(siteUrl, "/openapi.json")}
- API documentation: ${API_DOCS_URL}

## Notes

The Pareto API uses Bearer API keys. Request access through the API documentation before calling protected endpoints.
`;

const generateAgentSkillsIndex = (siteUrl, skillPath) => {
  const skillContent = readFileSync(skillPath, "utf8");
  const digest = createHash("sha256").update(skillContent).digest("hex");

  return JSON.stringify(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "pareto-agent-discovery",
          type: "skill-md",
          description:
            "Discover Pareto public pages, API metadata, documentation, robots policy, and sitemap resources.",
          url: canonicalUrl(
            siteUrl,
            "/.well-known/agent-skills/pareto-agent-discovery/SKILL.md",
          ),
          digest: `sha256:${digest}`,
        },
      ],
    },
    null,
    2,
  );
};

const generateHeadersFile = () => `/
  Link: </.well-known/api-catalog>; rel="api-catalog"
  Link: </openapi.json>; rel="service-desc"; type="application/openapi+json"
  Link: <https://docs.pareto.credit/developers/api>; rel="service-doc"; type="text/html"
  Link: </sitemap.xml>; rel="describedby"; type="application/xml"
  Vary: Accept

/index.html
  Link: </.well-known/api-catalog>; rel="api-catalog"
  Link: </openapi.json>; rel="service-desc"; type="application/openapi+json"
  Link: <https://docs.pareto.credit/developers/api>; rel="service-doc"; type="text/html"
  Link: </sitemap.xml>; rel="describedby"; type="application/xml"
  Vary: Accept

/.well-known/api-catalog
  Content-Type: application/linkset+json; charset=utf-8

/.well-known/oauth-protected-resource
  Content-Type: application/json; charset=utf-8

/health
  Content-Type: application/json; charset=utf-8
`;

export function generateAgentDiscovery({
  publicDir = resolve(process.cwd(), "public"),
  siteUrl = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  generatedAt = new Date(),
} = {}) {
  const normalizedSiteUrl = ensureTrailingSlash(siteUrl);
  const siteSkillPath = resolve(
    publicDir,
    ".well-known/agent-skills/pareto-agent-discovery/SKILL.md",
  );

  writeTextFile(resolve(publicDir, "robots.txt"), generateRobotsTxt(normalizedSiteUrl));
  writeTextFile(
    resolve(publicDir, "sitemap.xml"),
    generateSitemapXml(normalizedSiteUrl, generatedAt),
  );
  writeTextFile(resolve(publicDir, "index.md"), generateHomepageMarkdown(normalizedSiteUrl));
  writeTextFile(resolve(publicDir, ".well-known/api-catalog"), generateApiCatalog(normalizedSiteUrl));
  writeTextFile(resolve(publicDir, "openapi.json"), generateOpenApi());
  writeTextFile(resolve(publicDir, "health"), generateHealth(generatedAt));
  writeTextFile(
    resolve(publicDir, ".well-known/oauth-protected-resource"),
    generateOAuthProtectedResource(),
  );
  rmSync(resolve(publicDir, ".well-known/oauth-authorization-server"), {
    force: true,
  });
  rmSync(resolve(publicDir, ".well-known/openid-configuration"), {
    force: true,
  });
  writeTextFile(
    resolve(publicDir, ".well-known/mcp/server-card.json"),
    generateMcpServerCard(normalizedSiteUrl),
  );
  writeTextFile(siteSkillPath, generateSiteSkill(normalizedSiteUrl));
  writeTextFile(
    resolve(publicDir, ".well-known/agent-skills/index.json"),
    generateAgentSkillsIndex(normalizedSiteUrl, siteSkillPath),
  );
  writeTextFile(resolve(publicDir, "_headers"), generateHeadersFile());

  return {
    publicDir,
    siteUrl: normalizedSiteUrl,
    generatedAt,
  };
}

const isExecutedDirectly =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isExecutedDirectly) {
  generateAgentDiscovery();
}
