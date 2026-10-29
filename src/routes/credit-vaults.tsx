import { createFileRoute } from "@tanstack/react-router";
import ProductPage from "../pages/ProductPage";
export const Route = createFileRoute("/credit-vaults")({
  component: () => <ProductPage id="credit-vaults" />,
});
