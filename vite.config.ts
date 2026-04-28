/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const homepageLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '<https://docs.pareto.credit/developers/api>; rel="service-doc"; type="text/html"',
  '</sitemap.xml>; rel="describedby"; type="application/xml"',
].join(', ')

const mcpTools = [
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
]

const contentTypesByPath: Record<string, string> = {
  '/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
  '/.well-known/oauth-protected-resource': 'application/json; charset=utf-8',
  '/health': 'application/json; charset=utf-8',
}

const unavailableOAuthDiscoveryPaths = new Set([
  '/.well-known/oauth-authorization-server',
  '/.well-known/openid-configuration',
])

const isHomepagePath = (path: string) => path === '/' || path === '/index.html'

const acceptsMarkdown = (acceptHeader: string | undefined) =>
  acceptHeader?.toLowerCase().includes('text/markdown') ?? false

const sendJson = (
  res: import('node:http').ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

const readRequestBody = (req: import('node:http').IncomingMessage) =>
  new Promise<string>((resolveBody, rejectBody) => {
    let body = ''

    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolveBody(body))
    req.on('error', rejectBody)
  })

const mcpToolResult = (text: string, data: Record<string, unknown>) => ({
  content: [{ type: 'text', text }],
  structuredContent: data,
})

const handleMcpRequest = async (
  req: import('node:http').IncomingMessage,
  res: import('node:http').ServerResponse,
) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.end()
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'method_not_allowed' })
    return
  }

  let message: { id?: string | number | null; method?: string; params?: Record<string, unknown> }

  try {
    message = JSON.parse(await readRequestBody(req))
  } catch {
    sendJson(res, 400, {
      jsonrpc: '2.0',
      error: { code: -32700, message: 'Parse error' },
      id: null,
    })
    return
  }

  const id = message.id ?? null
  const method = message.method
  let result: Record<string, unknown>

  if (method === 'initialize') {
    result = {
      protocolVersion: '2025-06-18',
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'pareto-site', version: '1.0.0' },
    }
  } else if (method === 'tools/list') {
    result = { tools: mcpTools }
  } else if (method === 'tools/call') {
    const name = message.params?.name

    if (name === 'get_site_links') {
      result = mcpToolResult('Pareto public links.', {
        home: 'https://pareto.credit/',
        app: 'https://app.pareto.credit/',
        docs: 'https://docs.pareto.credit/',
        apiDocs: 'https://docs.pareto.credit/developers/api',
        privacyPolicy: 'https://pareto.credit/privacy-policy',
        termsOfService: 'https://pareto.credit/terms-of-service',
      })
    } else if (name === 'get_api_discovery') {
      result = mcpToolResult('Pareto API discovery resources.', {
        apiBaseUrl: 'https://api.pareto.credit/',
        apiCatalog: 'https://pareto.credit/.well-known/api-catalog',
        openApi: 'https://pareto.credit/openapi.json',
        apiDocs: 'https://docs.pareto.credit/developers/api',
        health: 'https://pareto.credit/health',
      })
    } else {
      sendJson(res, 200, {
        jsonrpc: '2.0',
        error: { code: -32602, message: 'Unknown tool' },
        id,
      })
      return
    }
  } else {
    sendJson(res, 200, {
      jsonrpc: '2.0',
      error: { code: -32601, message: 'Method not found' },
      id,
    })
    return
  }

  sendJson(res, 200, { jsonrpc: '2.0', result, id })
}

const applyAgentDiscoveryMiddleware = (middlewares: {
  use: (handler: (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, next: () => void) => void) => void
}) => {
  middlewares.use((req, res, next) => {
    const requestUrl = new URL(req.url ?? '/', 'http://localhost')

    if (requestUrl.pathname === '/mcp') {
      void handleMcpRequest(req, res)
      return
    }

    if (unavailableOAuthDiscoveryPaths.has(requestUrl.pathname)) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'oauth_discovery_not_available' }))
      return
    }

    if (isHomepagePath(requestUrl.pathname)) {
      res.setHeader('Link', homepageLinkHeader)
      res.setHeader('Vary', 'Accept')

      if (acceptsMarkdown(req.headers.accept)) {
        const markdown = readFileSync(resolve(import.meta.dirname, 'public/index.md'), 'utf8')
        const tokenCount = markdown.trim().split(/\s+/).filter(Boolean).length

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.setHeader('x-markdown-tokens', String(tokenCount))
        res.end(markdown)
        return
      }
    }

    const contentType = contentTypesByPath[requestUrl.pathname]
    if (contentType) {
      res.setHeader('Content-Type', contentType)
    }

    next()
  })
}

const agentDiscoveryPlugin = (): Plugin => ({
  name: 'pareto-agent-discovery',
  configureServer(server) {
    applyAgentDiscoveryMiddleware(server.middlewares)
  },
  configurePreviewServer(server) {
    applyAgentDiscoveryMiddleware(server.middlewares)
  },
})

export default defineConfig({
  plugins: [agentDiscoveryPlugin(), TanStackRouterVite(), react(), tailwindcss()],
  envPrefix: ['VITE_', 'PUBLIC_'],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  optimizeDeps: {
    include: ['@idle-multiverse/data-access'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /packages\/data-access/],
    },
  },
})
