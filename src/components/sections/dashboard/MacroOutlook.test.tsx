import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MacroOutlook from "./MacroOutlook";

vi.mock("../../../hooks/useMacroMarkets", () => ({
  useMacroMarkets: () => ({
    benchmarks: {
      isPending: false,
      data: {
        sofr30d: { value: 0, asOf: "2026-10-28" },
        sofr: { value: 4.1, asOf: "2026-10-27" },
        effr: { value: 3.9, asOf: "2026-10-27" },
      },
    },
    treasury: { isPending: false },
    protocolRates: [
      {
        protocol: "Aave",
        asset: "USDC",
        supplyApy: 0,
        borrowApy: 5,
        asOf: null,
        retrievedAt: "2026-10-28T10:00:00Z",
        sourceUrl: "https://app.aave.com/",
        coverage: "Aave V3 · Ethereum Core market",
      },
      {
        protocol: "Morpho",
        asset: "USDT",
        supplyApy: null,
        borrowApy: null,
        asOf: null,
        retrievedAt: null,
        sourceUrl: "https://app.morpho.org/",
        coverage: "Top 100 listed Ethereum markets",
      },
    ],
  }),
}));

describe("MacroOutlook", () => {
  it("retains a dated zero rate and working observations when another source is unavailable", () => {
    render(<MacroOutlook />);
    expect(
      screen.getByRole("heading", { name: "Rates & credit markets" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("30-day average SOFR").parentElement
    ).toHaveTextContent("0.00%");
    expect(
      screen.getByText("30-day average SOFR").parentElement
    ).toHaveTextContent("As of Oct 28, 2026");
    expect(
      screen.getByText("2-year U.S. Treasury").parentElement
    ).toHaveTextContent("Observation unavailable");
  });

  it("labels supply and borrow APY separately and discloses missing publication timestamps", () => {
    render(<MacroOutlook />);
    const aave = screen
      .getByRole("heading", { name: "Aave USDC" })
      .closest("article")!;
    expect(
      within(aave).getByText("Supply APY").parentElement
    ).toHaveTextContent("0.00%");
    expect(
      within(aave).getByText("Borrow APY").parentElement
    ).toHaveTextContent("5.00%");
    expect(aave).toHaveTextContent("Ethereum");
    expect(aave).toHaveTextContent(
      "Retrieved Oct 28, 2026 · publication time not supplied"
    );
    const morpho = screen
      .getByRole("heading", { name: "Morpho USDT" })
      .closest("article")!;
    expect(morpho).toHaveTextContent("Rate feed unavailable");
    expect(
      within(morpho).getByRole("link", { name: /Morpho/ })
    ).toHaveAttribute("href", "https://app.morpho.org/");
  });
});
