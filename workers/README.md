# Agent Discovery Worker

GitHub Pages serves the generated static files in `public/`, but it cannot add homepage `Link` response headers or return a different representation for `Accept: text/markdown`.

Deploy `agent-discovery-worker.js` in front of `pareto.credit` when those HTTP-layer checks need to pass in production. The worker:

- adds RFC 8288 `Link` headers on `/` and `/index.html`
- returns `Content-Type: text/markdown` for homepage requests with `Accept: text/markdown`
- sets explicit content types for extensionless well-known discovery resources

The same behavior is also installed for local Vite dev and preview through `vite.config.ts`.
