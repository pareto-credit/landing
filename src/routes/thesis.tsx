import { createFileRoute } from "@tanstack/react-router";
import ThesisPage from "../pages/ThesisPage";

export const Route = createFileRoute("/thesis")({
  component: ThesisPage,
});
