import { createFileRoute } from "@tanstack/react-router";
import PersonaPage from "../pages/PersonaPage";

const OriginatorsPage = () => <PersonaPage id="originators" />;

export const Route = createFileRoute("/ecosystem_/originators")({
  component: OriginatorsPage,
});
