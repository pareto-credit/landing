import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveLegacyAudienceHash } from "../lib/audienceNavigation";

export const Route = createFileRoute("/ecosystem_/originators")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/originators", hash: resolveLegacyAudienceHash(location.hash), search: location.search, replace: true });
  },
});
