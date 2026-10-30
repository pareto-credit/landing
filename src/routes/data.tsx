import { createFileRoute } from "@tanstack/react-router";
import DataDashboardPage from "../pages/DataDashboardPage";

export const Route = createFileRoute("/data")({
  component: DataDashboardPage,
});
