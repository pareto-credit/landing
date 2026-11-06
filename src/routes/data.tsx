import { pageHead } from "../lib/pageHead";
import { createFileRoute } from "@tanstack/react-router";
import DataDashboardPage from "../pages/DataDashboardPage";

export const Route = createFileRoute("/data")({
  head: () => pageHead("/data"),
  component: DataDashboardPage,
});
