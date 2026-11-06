import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveLegacyAudienceHash } from "../lib/audienceNavigation";
import PersonaPage from "../pages/PersonaPage";

export const Route = createFileRoute("/originators")({
  beforeLoad: ({ location }) => {
    const hash =
      location.hash === "get-started"
        ? "contact"
        : resolveLegacyAudienceHash(location.hash);
    if (hash !== location.hash)
      throw redirect({
        to: "/originators",
        hash,
        search: location.search,
        replace: true,
      });
  },
  component: () => <PersonaPage id="originators" />,
});
