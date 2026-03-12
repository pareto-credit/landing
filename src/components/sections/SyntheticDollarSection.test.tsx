import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SyntheticDollarSection from "./SyntheticDollarSection";

describe("SyntheticDollarSection", () => {
  it("renders both synthetic asset cards with their metrics", () => {
    render(<SyntheticDollarSection />);

    expect(
      screen.getByRole("heading", {
        name: /usp, the credit-based\s*synthetic dollar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /susp, the credit\s*savings rate/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("$3.7M")).toBeInTheDocument();
    expect(screen.getByText("8.57%")).toBeInTheDocument();
  });

  it("renders the provided USP app link", () => {
    render(<SyntheticDollarSection />);

    expect(
      screen.getByRole("link", { name: /explore/i }),
    ).toHaveAttribute("href", "https://app.pareto.credit/usp");
  });

  it("renders the dedicated USP and sUSP card icons", () => {
    render(<SyntheticDollarSection />);

    expect(screen.getByAltText("USP icon")).toBeInTheDocument();
    expect(screen.getByAltText("sUSP icon")).toBeInTheDocument();
  });
});
