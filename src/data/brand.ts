/**
 * Product naming used across the landing. Change the AI name here and it
 * updates every section, plan and page that mentions it.
 */
export const AI_NAME = "Cura";
export const AI_PRODUCT_NAME = `Pareto ${AI_NAME} AI`;
export const MCP_PRODUCT_NAME = "Pareto MCP";
export const STUDIO_PRODUCT_NAME = "Pareto Studio";
export const CURATOR_PARTNER_NAME = "NorthBridge";

export const PARETO_APP_URL = "https://app.pareto.credit/";
export const PARETO_DOCS_URL = "https://docs.pareto.credit/";
export const PARETO_BLOG_URL = "https://paragraph.com/@pareto";

/** Options offered by the contact form's "Interested in" field. */
export const CONTACT_INTERESTS = [
  "Pareto Studio (Core)",
  "Pro plan",
  "White-Glove by NorthBridge",
  `${MCP_PRODUCT_NAME} early access`,
  "Lending",
  "Borrowing",
  "Underwriting",
  "Integration",
] as const;

export type ContactInterest = (typeof CONTACT_INTERESTS)[number];
