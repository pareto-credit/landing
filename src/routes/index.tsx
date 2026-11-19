import { pageHead } from "../lib/pageHead";
import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => pageHead("/"),
  component: App,
});
