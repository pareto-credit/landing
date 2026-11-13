import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { thesisFacilityLayers } from "../../../data/thesis";
import { ThesisAnatomy } from "./ThesisAnatomy";

describe("ThesisAnatomy", () => {
  it("shows two key facts per module and reserves descriptions for the dialog", () => {
    render(<ThesisAnatomy />);

    const layers = screen.getByRole("group", { name: "Connect modules to Credit Vault" });
    expect(within(layers).getAllByRole("checkbox").map((module) => module.getAttribute("aria-label"))).toEqual([
      "Legal framework module", "Eligibility module", "Underwriting module", "Credit terms module", "Servicing module", "Distribution module",
    ]);
    for (const layer of thesisFacilityLayers) {
      const module = within(layers).getByRole("checkbox", { name: `${layer.title} module` });
      expect(within(module).queryByText(layer.detail)).not.toBeInTheDocument();
      expect(module.querySelectorAll(".thesis-facility__module-fact")).toHaveLength(2);
    }
    const legalFramework = within(layers).getByRole("checkbox", { name: "Legal framework module" });
    expect(legalFramework).toHaveAccessibleDescription("Facility-specific agreements Offchain legal recourse");
    expect(within(layers).getByText("Dedicated on-chain structure")).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("6 modules connected");

    const terms = within(layers).getByRole("checkbox", { name: "Credit terms module" });
    fireEvent.click(terms);
    expect(within(terms).getByText("Term or revolving")).toBeVisible();
    expect(terms).toHaveAccessibleDescription("Term or revolving Agreed credit support");
    expect(terms).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("status")).toHaveTextContent("5 modules connected");
  });

  it("opens the full description and dismisses it when clicking outside", () => {
    render(<ThesisAnatomy />);

    const legalFramework = screen.getByRole("checkbox", { name: "Legal framework module" });
    const trigger = screen.getByRole("button", { name: "Details for Legal framework" });
    const dialog = document.getElementById(trigger.getAttribute("aria-controls")!) as HTMLDialogElement;
    // JSDOM exposes the open attribute but omits the native dialog methods.
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; };
    vi.spyOn(dialog, "getBoundingClientRect").mockReturnValue(new DOMRect(100, 100, 200, 200));

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Legal framework" })).toBe(dialog);
    const description = within(dialog).getByText(thesisFacilityLayers.find((layer) => layer.id === "legal")!.detail);
    expect(description).toBeVisible();
    expect(legalFramework).toHaveAttribute("aria-checked", "true");

    fireEvent.click(dialog, { clientX: 120, clientY: 120 });
    expect(dialog).toHaveAttribute("open");
    fireEvent.click(dialog, { clientX: 90, clientY: 120 });
    expect(dialog).not.toHaveAttribute("open");
    expect(legalFramework).toHaveAttribute("aria-checked", "true");
  });

  it("supports independent connections, keyboard activation and wrapping focus", () => {
    render(<ThesisAnatomy />);

    const legalFramework = screen.getByRole("checkbox", { name: "Legal framework module" });
    const distribution = screen.getByRole("checkbox", { name: "Distribution module" });
    fireEvent.keyDown(legalFramework, { key: "ArrowLeft" });
    expect(distribution).toHaveFocus();
    expect(distribution).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(distribution, { key: " " });
    expect(distribution).toHaveAttribute("aria-checked", "false");
    expect(legalFramework).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(distribution, { key: "Enter" });
    expect(distribution).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(distribution, { key: "ArrowRight" });
    expect(legalFramework).toHaveFocus();
    fireEvent.keyDown(legalFramework, { key: "End" });
    expect(distribution).toHaveFocus();
    fireEvent.keyDown(distribution, { key: "Home" });
    expect(legalFramework).toHaveFocus();
    expect(screen.getAllByRole("checkbox").every((module) => module.tabIndex === 0)).toBe(true);
    screen.getAllByRole("checkbox").forEach((module) => fireEvent.click(module));
    expect(screen.getByRole("status")).toHaveTextContent("0 modules connected");
    expect(screen.getAllByRole("checkbox").every((module) => module.getAttribute("aria-checked") === "false")).toBe(true);
    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute("href", "/thesis#why-pareto");

    fireEvent.click(legalFramework);
    expect(screen.getByRole("status")).toHaveTextContent("1 module connected");
    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute("href", "/thesis#why-pareto");
  });
});
