import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveLegacyAudienceHash } from "../lib/audienceNavigation";

export const Route = createFileRoute("/ecosystem_/capital-providers")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/capital-providers", hash: resolveLegacyAudienceHash(location.hash), search: location.search, replace: true });
  },
});
