const HOME_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '<https://docs.pareto.credit/developers/api>; rel="service-doc"; type="text/html"',
  '</sitemap.xml>; rel="describedby"; type="application/xml"',
];

const MCP_TOOLS = [
  {
    name: 'get_site_links',
    description: 'Return canonical Pareto site, documentation, app, and legal links.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'get_api_discovery',
    description: 'Return machine-readable discovery endpoints for the Pareto API.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
];

const CONTENT_TYPES = {
  '/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
  '/.well-known/oauth-protected-resource': 'application/json; charset=utf-8',
  '/health': 'application/json; charset=utf-8',
};

const UNAVAILABLE_OAUTH_DISCOVERY_PATHS = new Set([
  '/.well-known/oauth-authorization-server',
  '/.well-known/openid-configuration',
]);

const HOME_MARKDOWN = `# Pareto

Pareto builds transparent credit infrastructure with enterprise-grade compliance for modern capital markets.

## Primary Pages

- [Home](https://pareto.credit/)
- [Privacy Policy](https://pareto.credit/privacy-policy)
- [Terms of Service](https://pareto.credit/terms-of-service)

## Product Areas

- Tokenized credit vaults for institutional credit products
- USP synthetic dollar products
- White-label and studio tooling for credit infrastructure
- Ecosystem, operator, documentation, governance, and developer resources

## Developer Resources

- [API documentation](https://docs.pareto.credit/developers/api)
- [OpenAPI description](https://pareto.credit/openapi.json)
- [API catalog](https://pareto.credit/.well-known/api-catalog)
- [Sitemap](https://pareto.credit/sitemap.xml)

## Contact

- Email: info@pareto.credit
- Web app: https://app.pareto.credit/
- Documentation: https://docs.pareto.credit/
`;

const isHomepage = (pathname) => pathname === '/' || pathname === '/index.html';

const acceptsMarkdown = (request) =>
  request.headers.get('Accept')?.toLowerCase().includes('text/markdown') ?? false;

const markdownTokenCount = (markdown) => markdown.trim().split(/\s+/).filter(Boolean).length;

const mcpToolResult = (text, data) => ({
  content: [{ type: 'text', text }],
  structuredContent: data,
});

const handleMcpRequest = async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405 });
  }

  let message;

  try {
    message = await request.json();
  } catch {
    return Response.json({
      jsonrpc: '2.0',
      error: { code: -32700, message: 'Parse error' },
      id: null,
    }, { status: 400 });
  }

  const id = message.id ?? null;
  let result;

  if (message.method === 'initialize') {
    result = {
      protocolVersion: '2025-06-18',
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'pareto-site', version: '1.0.0' },
    };
  } else if (message.method === 'tools/list') {
    result = { tools: MCP_TOOLS };
  } else if (message.method === 'tools/call') {
    if (message.params?.name === 'get_site_links') {
      result = mcpToolResult('Pareto public links.', {
        home: 'https://pareto.credit/',
        app: 'https://app.pareto.credit/',
        docs: 'https://docs.pareto.credit/',
        apiDocs: 'https://docs.pareto.credit/developers/api',
        privacyPolicy: 'https://pareto.credit/privacy-policy',
        termsOfService: 'https://pareto.credit/terms-of-service',
      });
    } else if (message.params?.name === 'get_api_discovery') {
      result = mcpToolResult('Pareto API discovery resources.', {
        apiBaseUrl: 'https://api.pareto.credit/',
        apiCatalog: 'https://pareto.credit/.well-known/api-catalog',
        openApi: 'https://pareto.credit/openapi.json',
        apiDocs: 'https://docs.pareto.credit/developers/api',
        health: 'https://pareto.credit/health',
      });
    } else {
      return Response.json({
        jsonrpc: '2.0',
        error: { code: -32602, message: 'Unknown tool' },
        id,
      });
    }
  } else {
    return Response.json({
      jsonrpc: '2.0',
      error: { code: -32601, message: 'Method not found' },
      id,
    });
  }

  return Response.json({ jsonrpc: '2.0', result, id });
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/mcp') {
      return handleMcpRequest(request);
    }

    if (UNAVAILABLE_OAUTH_DISCOVERY_PATHS.has(url.pathname)) {
      return Response.json({ error: 'oauth_discovery_not_available' }, { status: 404 });
    }

    if (isHomepage(url.pathname) && acceptsMarkdown(request)) {
      return new Response(HOME_MARKDOWN, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(markdownTokenCount(HOME_MARKDOWN)),
          'Link': HOME_LINKS.join(', '),
          'Vary': 'Accept',
        },
      });
    }

    const response = await fetch(request);
    const headers = new Headers(response.headers);

    if (isHomepage(url.pathname)) {
      headers.set('Link', HOME_LINKS.join(', '));
      headers.append('Vary', 'Accept');
    }

    const contentType = CONTENT_TYPES[url.pathname];
    if (contentType) {
      headers.set('Content-Type', contentType);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
