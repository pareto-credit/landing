import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { thesisFacilityLayers } from "../../../data/thesis";
import { ThesisAnatomy } from "./ThesisAnatomy";

describe("ThesisAnatomy", () => {
  it("shows the former footer descriptions and key facts inside the six module controls", () => {
    render(<ThesisAnatomy />);

    const layers = screen.getByRole("group", { name: "Connect modules to Credit Vault" });
    expect(within(layers).getAllByRole("checkbox").map((module) => module.getAttribute("aria-label"))).toEqual([
      "Application module", "Eligibility module", "Underwriting module", "Credit terms module", "Servicing module", "Distribution module",
    ]);
    for (const layer of thesisFacilityLayers) {
      const module = within(layers).getByRole("checkbox", { name: `${layer.title} module` });
      const description = within(module).getByText(layer.detail);
      expect(description).toBeVisible();
      expect(description).toHaveClass("line-clamp-2");
    }
    const application = within(layers).getByRole("checkbox", { name: "Application module" });
    expect(application).toHaveAccessibleDescription(/^Run facility operations in Pareto Studio.* Pareto Studio · Pareto Lender App$/);
    expect(screen.getByRole("status")).toHaveTextContent("6 modules connected");

    const terms = within(layers).getByRole("checkbox", { name: "Credit terms module" });
    fireEvent.click(terms);
    expect(within(layers).getByText("Term or revolving · Agreed credit support")).toBeVisible();
    expect(terms).toHaveAccessibleDescription(/^Agree commercial terms.* Term or revolving · Agreed credit support$/);
    expect(terms).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("status")).toHaveTextContent("5 modules connected");
  });

  it("opens the full description without changing the module connection", () => {
    render(<ThesisAnatomy />);

    const terms = screen.getByRole("checkbox", { name: "Credit terms module" });
    const trigger = screen.getByRole("button", { name: "Details for Credit terms" });
    const dialog = document.getElementById(trigger.getAttribute("aria-controls")!) as HTMLDialogElement;
    // JSDOM exposes the open attribute but omits the native dialog methods.
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; };

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Credit terms" })).toBe(dialog);
    const description = within(dialog).getByText(thesisFacilityLayers.find((layer) => layer.id === "terms")!.detail);
    expect(description).toBeVisible();
    expect(description).not.toHaveClass("line-clamp-2");
    expect(terms).toHaveAttribute("aria-checked", "true");

    fireEvent.click(within(dialog).getByRole("button", { name: "Close module details" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("supports independent connections, keyboard activation and wrapping focus", () => {
    render(<ThesisAnatomy />);

    const application = screen.getByRole("checkbox", { name: "Application module" });
    const distribution = screen.getByRole("checkbox", { name: "Distribution module" });
    fireEvent.keyDown(application, { key: "ArrowLeft" });
    expect(distribution).toHaveFocus();
    expect(distribution).toHaveAttribute("aria-checked", "true");
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
    expect(screen.getByRole("button", { name: "Discuss your facility" })).toBeDisabled();
    expect(screen.queryByRole("link", { name: "Discuss your facility" })).not.toBeInTheDocument();

    fireEvent.click(application);
    expect(screen.getByRole("status")).toHaveTextContent("1 module connected");
    expect(screen.getByRole("link", { name: "Discuss your facility" })).toHaveAttribute("href", "/thesis#contact");
  });
});
