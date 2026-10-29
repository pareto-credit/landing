import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ecosystem")({
  beforeLoad: ({ location }) => { throw redirect({ to: "/", search: location.search, replace: true }); },
});
