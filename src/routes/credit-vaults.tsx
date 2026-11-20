import { pageHead } from "../lib/pageHead";
import { createFileRoute, redirect } from "@tanstack/react-router";
import ProductPage from "../pages/ProductPage";
export const Route = createFileRoute("/credit-vaults")({
  head: () => pageHead("/credit-vaults"),
  beforeLoad: ({ location }) => {
    if (["modules", "agents", "anatomy"].includes(location.hash)) {
      throw redirect({
        to: "/credit-vaults",
        hash: location.hash === "modules" ? "facilities" : "infrastructure",
        search: location.search,
        replace: true,
      });
    }
  },
  component: () => <ProductPage id="credit-vaults" />,
});
