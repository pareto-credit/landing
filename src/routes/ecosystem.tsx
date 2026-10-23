import { createFileRoute } from "@tanstack/react-router";
import EcosystemPage from "../pages/EcosystemPage";

export const Route = createFileRoute("/ecosystem")({
  component: EcosystemPage,
});
