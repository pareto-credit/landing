type JsonObject = Record<string, unknown>;

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: JsonObject;
  execute: (input?: JsonObject) => unknown | Promise<unknown>;
}

interface ModelContextRegistration {
  unregister?: () => void;
  dispose?: () => void;
}

interface ModelContext {
  registerTool?: (
    tool: WebMcpTool,
    options?: { signal?: AbortSignal },
  ) => ModelContextRegistration | void;
  provideContext?: (
    context: { tools: WebMcpTool[] },
    options?: { signal?: AbortSignal },
  ) => ModelContextRegistration | void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const siteSections = ["hero", "ecosystem", "products", "solutions", "news", "contact"] as const;

const getSiteUrl = () => window.location.origin;

const toolResult = (message: string, data: JsonObject = {}) => ({
  content: [{ type: "text", text: message }],
  data,
});

const createTools = (): WebMcpTool[] => [
  {
    name: "navigate-section",
    description: "Navigate the Pareto homepage to a public section.",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: siteSections,
          description: "Homepage section identifier.",
        },
      },
      required: ["section"],
      additionalProperties: false,
    },
    execute: (input = {}) => {
      const section = typeof input.section === "string" ? input.section : "";

      if (!siteSections.includes(section as (typeof siteSections)[number])) {
        return toolResult("Unknown Pareto homepage section.", { ok: false });
      }

      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return toolResult(`Navigated to ${section}.`, { ok: true, section });
    },
  },
  {
    name: "get-site-links",
    description: "Return canonical Pareto site, documentation, social, and legal links.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () =>
      toolResult("Pareto public links.", {
        home: `${getSiteUrl()}/`,
        app: "https://app.pareto.credit/",
        docs: "https://docs.pareto.credit/",
        apiDocs: "https://docs.pareto.credit/developers/api",
        governance: "https://gov.pareto.credit/",
        privacyPolicy: `${getSiteUrl()}/privacy-policy`,
        termsOfService: `${getSiteUrl()}/terms-of-service`,
      }),
  },
  {
    name: "get-api-discovery",
    description: "Return machine-readable discovery endpoints for the Pareto API.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () =>
      toolResult("Pareto API discovery resources.", {
        apiBaseUrl: "https://api.pareto.credit/",
        apiCatalog: `${getSiteUrl()}/.well-known/api-catalog`,
        openApi: `${getSiteUrl()}/openapi.json`,
        apiDocs: "https://docs.pareto.credit/developers/api",
        health: `${getSiteUrl()}/health`,
      }),
  },
];

const disposeRegistration = (registration: ModelContextRegistration | void) => {
  registration?.unregister?.();
  registration?.dispose?.();
};

export const registerParetoWebMcp = () => {
  if (typeof navigator === "undefined" || !navigator.modelContext) {
    return () => {};
  }

  const controller = new AbortController();
  const tools = createTools();
  const registrations: Array<ModelContextRegistration | void> = [];
  const { modelContext } = navigator;

  try {
    if (typeof modelContext.registerTool === "function") {
      for (const tool of tools) {
        registrations.push(modelContext.registerTool(tool, { signal: controller.signal }));
      }
    } else if (typeof modelContext.provideContext === "function") {
      registrations.push(modelContext.provideContext({ tools }, { signal: controller.signal }));
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("[WebMCP] Failed to register Pareto tools", error);
    }
  }

  return () => {
    controller.abort();
    registrations.forEach(disposeRegistration);
  };
};
