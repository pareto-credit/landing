import { pageHead } from "../lib/pageHead";
import { createFileRoute } from "@tanstack/react-router";
import ProductPage from "../pages/ProductPage";
export const Route = createFileRoute("/studio")({
  head: () => pageHead("/studio"),
  component: () => <ProductPage id="studio" />,
});
