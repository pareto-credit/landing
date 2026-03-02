import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SyntheticDollarSection from "./SyntheticDollarSection";

describe("SyntheticDollarSection", () => {
  it("defaults to USP and switches to sUSP details", async () => {
    render(<SyntheticDollarSection />);

    expect(
      screen.getByRole("heading", {
        name: /usp, the credit-based synthetic dollar/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("$3.7M")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /susp/i }));

    expect(
      await screen.findByRole("heading", {
        name: /susp, the credit savings rate/i,
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText("8.57%")).toBeInTheDocument();
  });

  it("renders the provided USP app and docs links across token states", () => {
    render(<SyntheticDollarSection />);

    expect(
      screen.getByRole("link", { name: /open in app/i }),
    ).toHaveAttribute("href", "https://app.pareto.credit/usp");
    expect(screen.getByRole("link", { name: /documents/i })).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/product/usp",
    );

    fireEvent.click(screen.getByRole("button", { name: /susp/i }));

    expect(
      screen.getByRole("link", { name: /open in app/i }),
    ).toHaveAttribute("href", "https://app.pareto.credit/usp");
    expect(screen.getByRole("link", { name: /documents/i })).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/product/usp",
    );
  });

  it("renders the dedicated USP and sUSP tab icons", () => {
    render(<SyntheticDollarSection />);

    expect(screen.getByAltText("USP icon")).toBeInTheDocument();
    expect(screen.getByAltText("sUSP icon")).toBeInTheDocument();
  });
});
