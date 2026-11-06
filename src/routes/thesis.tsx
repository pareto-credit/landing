import { pageHead } from "../lib/pageHead";
import { createFileRoute } from "@tanstack/react-router";
import ThesisPage from "../pages/ThesisPage";

export const Route = createFileRoute("/thesis")({
  head: () => pageHead("/thesis"),
  component: ThesisPage,
});
