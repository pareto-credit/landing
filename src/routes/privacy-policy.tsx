import { createFileRoute } from "@tanstack/react-router";
import { loadLegalDocument } from "../data/legalDocuments";
import LegalDocumentPage from "../pages/LegalDocumentPage";

export const Route = createFileRoute("/privacy-policy")({
  loader: () => loadLegalDocument("privacy"),
  component: PrivacyPolicyRoute,
});

function PrivacyPolicyRoute() {
  const document = Route.useLoaderData();

  return <LegalDocumentPage content={document.content} />;
}
