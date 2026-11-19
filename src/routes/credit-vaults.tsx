import { pageHead } from "../lib/pageHead";
import { createFileRoute, redirect } from "@tanstack/react-router";
import ProductPage from "../pages/ProductPage";
export const Route = createFileRoute("/credit-vaults")({
  head: () => pageHead("/credit-vaults"),
  beforeLoad: ({ location }) => {
    if (["modules", "agents", "anatomy", "infrastructure"].includes(location.hash)) {
      throw redirect({
        to: "/credit-vaults",
        hash: location.hash === "modules" ? "facilities" : "products",
        search: location.search,
        replace: true,
      });
    }
  },
  component: () => <ProductPage id="credit-vaults" />,
});
