import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SyntheticDollarSection from "./SyntheticDollarSection";

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

describe("SyntheticDollarSection", () => {
  it("renders both synthetic asset cards with their metrics", () => {
    render(<SyntheticDollarSection />);

    expect(
      screen.getByRole("heading", {
        name: /usp, the credit\s*index unit/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /susp, the credit\s*index return/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("$3.6M")).toBeInTheDocument();
    expect(screen.getByText("77%")).toBeInTheDocument();
    expect(screen.getByText("8.18%")).toBeInTheDocument();
  });

  it("renders the provided USP app link in the desktop header", () => {
    render(<SyntheticDollarSection />);

    const link = screen.getByRole("link", { name: /explore/i });

    expect(link).toHaveAttribute("href", "https://app.pareto.credit/usp");
    expect(screen.getByTestId("synthetic-header-actions")).toContainElement(link);
  });

  it("renders the provided USP app link in the mobile footer", () => {
    setViewportWidth(390);

    render(<SyntheticDollarSection />);

    expect(screen.getByTestId("synthetic-footer-actions")).toContainElement(
      screen.getByRole("link", { name: /explore/i }),
    );
  });

  it("renders the dedicated USP and sUSP card icons", () => {
    render(<SyntheticDollarSection />);

    expect(screen.getByAltText("USP icon")).toBeInTheDocument();
    expect(screen.getByAltText("sUSP icon")).toBeInTheDocument();
  });

  it("renders the updated section copy", () => {
    render(<SyntheticDollarSection />);

    expect(screen.getByText("Indexes")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /the credit market, made investable/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /pareto introduces a composable index unit and its yield-bearing counterpart/i,
      ),
    ).toBeInTheDocument();
  });
});
