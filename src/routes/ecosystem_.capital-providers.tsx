import { createFileRoute } from "@tanstack/react-router";
import PersonaPage from "../pages/PersonaPage";

const CapitalProvidersPage = () => <PersonaPage id="capital-providers" />;

export const Route = createFileRoute("/ecosystem_/capital-providers")({
  component: CapitalProvidersPage,
});
