import { createFileRoute } from "@tanstack/react-router";
import { loadLegalDocument } from "../data/legalDocuments";
import LegalDocumentPage from "../pages/LegalDocumentPage";

export const Route = createFileRoute("/terms-of-service")({
  loader: () => loadLegalDocument("terms"),
  component: TermsOfServiceRoute,
});

function TermsOfServiceRoute() {
  const document = Route.useLoaderData();

  return <LegalDocumentPage content={document.content} />;
}
