import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { thesisStages } from "../../../data/thesis";
import ThesisLifecycle from "./ThesisLifecycle";

describe("ThesisLifecycle", () => {
  it("starts at origination and exposes one labelled panel", () => {
    render(<ThesisLifecycle />);
    expect(screen.getAllByRole("tab")).toHaveLength(5);
    expect(screen.getByRole("tab", { name: /originate/i })).toHaveAttribute("aria-selected", "true");
    const panel = screen.getByRole("tabpanel", { name: /originate/i });
    expect(panel).toHaveTextContent(thesisStages[0].copy);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("selects a stage and keeps a single tab stop", () => {
    render(<ThesisLifecycle />);
    const operate = screen.getByRole("tab", { name: /operate/i });
    fireEvent.click(operate);
    expect(operate).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: /operate/i })).toHaveTextContent(thesisStages[3].copy);
    expect(screen.getByRole("tab", { name: /originate/i })).toHaveAttribute("tabindex", "-1");
    expect(operate).toHaveAttribute("tabindex", "0");
  });

  it("supports arrow-key wrapping and Home/End navigation", () => {
    render(<ThesisLifecycle />);
    const originate = screen.getByRole("tab", { name: /originate/i });
    const distribute = screen.getByRole("tab", { name: /distribute/i });
    fireEvent.keyDown(originate, { key: "ArrowLeft" });
    expect(distribute).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: /distribute/i })).toBeVisible();
    fireEvent.keyDown(distribute, { key: "ArrowRight" });
    expect(originate).toHaveFocus();
    fireEvent.keyDown(originate, { key: "End" });
    expect(distribute).toHaveFocus();
    fireEvent.keyDown(distribute, { key: "Home" });
    expect(originate).toHaveFocus();
  });

  it("advances linearly and keeps focus on the selected stage", () => {
    render(<ThesisLifecycle />);
    for (const stage of thesisStages.slice(1)) {
      fireEvent.click(screen.getByRole("button", { name: `Next: ${stage.title}` }));
      expect(screen.getByRole("tab", { name: new RegExp(stage.title, "i") })).toHaveFocus();
      expect(screen.getByRole("tabpanel", { name: new RegExp(stage.title, "i") })).toHaveTextContent(stage.detail);
    }
    expect(screen.queryByRole("button", { name: /next:/i })).not.toBeInTheDocument();
  });
});
