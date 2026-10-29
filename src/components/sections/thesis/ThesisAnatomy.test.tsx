import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThesisAnatomy } from "./ThesisAnatomy";

describe("ThesisAnatomy", () => {
  it("connects the facility diagram to the six configurable business layers", () => {
    render(<ThesisAnatomy />);

    const layers = screen.getByRole("group", { name: "Connect modules to Credit Vault" });
    expect(within(layers).getAllByRole("checkbox").map((module) => module.getAttribute("aria-label"))).toEqual([
      "Application module", "Eligibility module", "Underwriting module", "Credit terms module", "Servicing module", "Distribution module",
    ]);
    const application = screen.getByRole("region", { name: "Application module" });
    expect(application).toHaveTextContent("Pareto Studio");
    expect(application).toHaveTextContent("Pareto Lender App");
    const description = within(application).getByText(/Run facility operations in Pareto Studio/);
    expect(description).not.toBeVisible();
    fireEvent.click(within(application).getByText("Module details"));
    expect(description).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("6 modules connected");

    fireEvent.click(screen.getByRole("checkbox", { name: "Credit terms module" }));
    const terms = screen.getByRole("region", { name: "Credit terms module" });
    expect(terms).toHaveTextContent("Term");
    expect(terms).toHaveTextContent("Revolving");
    expect(terms).toHaveTextContent("Collateralized");
    expect(terms).toHaveTextContent("Asset-backed");
    expect(screen.queryByRole("region", { name: "Application module" })).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Credit terms module" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("status")).toHaveTextContent("5 modules connected");
  });

  it("supports independent connections, keyboard activation and wrapping focus", () => {
    render(<ThesisAnatomy />);

    const application = screen.getByRole("checkbox", { name: "Application module" });
    const distribution = screen.getByRole("checkbox", { name: "Distribution module" });
    fireEvent.keyDown(application, { key: "ArrowLeft" });
    expect(distribution).toHaveFocus();
    expect(distribution).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("region", { name: "Distribution module" })).toBeVisible();
    fireEvent.keyDown(distribution, { key: " " });
    expect(distribution).toHaveAttribute("aria-checked", "false");
    expect(application).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(distribution, { key: "Enter" });
    expect(distribution).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(distribution, { key: "ArrowRight" });
    expect(application).toHaveFocus();
    fireEvent.keyDown(application, { key: "End" });
    expect(distribution).toHaveFocus();
    fireEvent.keyDown(distribution, { key: "Home" });
    expect(application).toHaveFocus();
    expect(screen.getAllByRole("checkbox").every((module) => module.tabIndex === 0)).toBe(true);
    screen.getAllByRole("checkbox").forEach((module) => fireEvent.click(module));
    expect(screen.getByRole("status")).toHaveTextContent("0 modules connected");
    expect(screen.getAllByRole("checkbox").every((module) => module.getAttribute("aria-checked") === "false")).toBe(true);
  });
});
