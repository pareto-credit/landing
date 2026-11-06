import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientContext } from "../contexts/ApiClientContext";
import { useProductsData } from "../hooks/useProductsData";
import { useCreditHistory } from "../hooks/useCreditHistory";
import { createParetoPublicApiClient } from "../lib/paretoPublicApi";
import type { BenchmarkRates, MarketObservation } from "../lib/macroMarkets";
import DataDashboardPage from "./DataDashboardPage";

vi.mock("../components/layout/Navbar", () => ({ default: () => <nav /> }));
vi.mock("../components/layout/Footer", () => ({ default: () => <footer /> }));
vi.mock("../hooks/useProductsData", () => ({ useProductsData: vi.fn() }));
vi.mock("../hooks/useCreditHistory", () => ({ useCreditHistory: vi.fn() }));
vi.mock("../components/sections/dashboard/MacroOutlook", () => ({
  default: () => <section aria-label="Rates and credit markets" />,
}));

const productsData: ReturnType<typeof useProductsData> = {
  metrics: { creditExtended: 1_400_000_000, outstandingLoans: 150_000_000 },
  weightedAverageApr: 7.25,
  vaults: [
    {
      id: "facility-a",
      address: "0x123",
      name: "Example Credit Vault",
      operatorName: "Example Operator",
      asset: "USDC",
      apy: "8.10%",
      tvl: "$3.2M",
      status: "RUNNING_EPOCH",
      visibility: "PUBLIC",
    },
  ],
  isLoading: false,
  isUsingFallback: false,
  isPartialData: false,
  availability: {
    metrics: { creditExtended: true, outstandingLoans: true },
    vaultTvl: true,
  },
};

const benchmarkRates: BenchmarkRates = {
  sofr30d: { value: 4.25, asOf: "2026-10-28" },
  sofr: { value: 4.2, asOf: "2026-10-28" },
  effr: { value: 4.3, asOf: "2026-10-28" },
};
const queryClients: QueryClient[] = [];

function renderDashboard(sofr30d: MarketObservation = benchmarkRates.sofr30d) {
  const queryClient = new QueryClient();
  queryClients.push(queryClient);
  queryClient.setQueryData(["macro-markets", "ny-fed"], {
    ...benchmarkRates,
    sofr30d,
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <DataDashboardPage />
    </QueryClientProvider>
  );
}

afterEach(() => {
  queryClients.splice(0).forEach((client) => client.clear());
});

beforeEach(() => {
  vi.mocked(useProductsData).mockReturnValue(productsData);
  vi.mocked(useCreditHistory).mockReturnValue({
    points: [],
    isLoading: false,
    error: null,
    source: null,
    asOf: null,
  });
});

describe("DataDashboardPage", () => {
  it("shows the reported TVL-weighted APR and its premium instead of facility and asset counts", () => {
    renderDashboard();

    const average = screen.getByText("Average interest rate").closest("div")!;
    const premium = screen.getByText("Premium over 30-day SOFR").closest("div")!;
    expect(within(average).getByText("7.25%")).toBeInTheDocument();
    expect(average).toHaveTextContent(/TVL-weighted.*APR/);
    expect(within(premium).getByText("+300 bps")).toBeInTheDocument();
    expect(screen.queryByText("Listed facilities")).not.toBeInTheDocument();
    expect(screen.queryByText("Assets represented")).not.toBeInTheDocument();
  });

  it.each([
    { apr: 7.25, sofr: 4.25, expected: "+300 bps" },
    { apr: 3.5, sofr: 4.25, expected: "-75 bps" },
    { apr: 4.25, sofr: 4.25, expected: "0 bps" },
    { apr: 0, sofr: 4.25, expected: "-425 bps" },
    { apr: 7.25, sofr: 0, expected: "+725 bps" },
    { apr: 0, sofr: 0, expected: "0 bps" },
  ])("shows $expected for APR $apr and SOFR $sofr", ({ apr, sofr, expected }) => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      weightedAverageApr: apr,
    });
    renderDashboard({ value: sofr, asOf: "2026-10-28" });

    const average = screen.getByText("Average interest rate").closest("div")!;
    const premium = screen.getByText("Premium over 30-day SOFR").closest("div")!;
    expect(within(average).getByText(`${apr.toFixed(2)}%`)).toBeInTheDocument();
    expect(within(premium).getByText(expected)).toBeInTheDocument();
  });

  it.each([undefined, null, Number.NaN, Infinity])(
    "keeps the average and premium unavailable when reported APR is %s",
    (weightedAverageApr) => {
      vi.mocked(useProductsData).mockReturnValue({
        ...productsData,
        weightedAverageApr,
      });
      renderDashboard();

      for (const label of ["Average interest rate", "Premium over 30-day SOFR"]) {
        const metric = screen.getByText(label).closest("div")!;
        expect(within(metric).getByText("—")).toBeInTheDocument();
      }
    }
  );

  it.each([
    { value: null, asOf: null },
    { value: Number.NaN, asOf: "2026-10-28" },
    { value: Infinity, asOf: "2026-10-28" },
    { value: 4.25, asOf: null },
  ])("retains the average APR but leaves the premium unavailable for SOFR $value as of $asOf", (sofr30d) => {
    renderDashboard(sofr30d);

    const average = screen.getByText("Average interest rate").closest("div")!;
    const premium = screen.getByText("Premium over 30-day SOFR").closest("div")!;
    expect(within(average).getByText("7.25%")).toBeInTheDocument();
    expect(within(premium).getByText("—")).toBeInTheDocument();
  });

  it("leaves both rate cards unavailable when products use an illustrative fallback", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      isUsingFallback: true,
    });
    renderDashboard();

    for (const label of ["Average interest rate", "Premium over 30-day SOFR"]) {
      const metric = screen.getByText(label).closest("div")!;
      expect(within(metric).getByText("—")).toBeInTheDocument();
    }
  });

  it("sorts facilities by numeric USD TVL with unknown values after an actual zero", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      vaults: [
        {
          ...productsData.vaults[0],
          id: "small",
          name: "Small facility",
          tvl: "$2M",
          tvlUsd: 2_000_000,
        },
        {
          ...productsData.vaults[0],
          id: "unknown",
          name: "Unknown facility",
          tvl: "—",
          tvlUsd: null,
        },
        {
          ...productsData.vaults[0],
          id: "large",
          name: "Large facility",
          tvl: "$170.2M",
          tvlUsd: 170_200_000,
        },
        {
          ...productsData.vaults[0],
          id: "zero",
          name: "Zero facility",
          tvl: "$0",
          tvlUsd: 0,
        },
      ],
    });
    const { container } = renderDashboard();
    const table = screen.getByRole("table", {
      name: /public credit facilities/i,
    });
    expect(
      within(table)
        .getAllByRole("rowheader")
        .map((row) => row.textContent?.trim())
    ).toEqual([
      expect.stringContaining("Large facility"),
      expect.stringContaining("Small facility"),
      expect.stringContaining("Zero facility"),
      expect.stringContaining("Unknown facility"),
    ]);
    expect(
      within(table).getByRole("columnheader", { name: "TVL" })
    ).toHaveAttribute("aria-sort", "descending");
    const macro = screen.getByRole("region", {
      name: "Rates and credit markets",
    });
    expect(
      container
        .querySelector(".data-dashboard-metrics")!
        .compareDocumentPosition(macro) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      macro.compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("lets readers select either credit series, inspect a date and change the history range", () => {
    vi.mocked(useCreditHistory).mockReturnValue({
      points: [
        {
          date: "2025-01-01",
          creditExtendedUsd: 200_000_000,
          tvlUsd: 40_000_000,
        },
        {
          date: "2026-08-01",
          creditExtendedUsd: 1_000_000_000,
          tvlUsd: 120_000_000,
        },
        {
          date: "2026-10-28",
          creditExtendedUsd: 1_400_000_000,
          tvlUsd: 150_000_000,
        },
      ],
      isLoading: false,
      error: null,
      source: "Pareto public history",
      asOf: "2026-10-28",
    });
    const { container } = renderDashboard();
    const credit = screen.getByRole("button", { name: "Credit Extended" });
    const outstanding = screen.getByRole("button", {
      name: "Outstanding Loans",
    });
    expect(credit).toHaveAttribute("aria-pressed", "true");
    expect(outstanding).toHaveAttribute("aria-pressed", "true");
    expect(
      container.querySelectorAll(".credit-history-plot path[data-series]")
    ).toHaveLength(2);
    fireEvent.click(credit);
    expect(
      container.querySelectorAll(".credit-history-plot path[data-series]")
    ).toHaveLength(1);
    fireEvent.click(outstanding);
    expect(
      screen.getByText("Select a metric to view its history.")
    ).toBeInTheDocument();
    fireEvent.click(outstanding);
    fireEvent.click(screen.getByRole("button", { name: "3M" }));
    const plot = screen.getByRole("img", { name: "Credit activity over time" });
    fireEvent.keyDown(plot, { key: "ArrowRight" });
    expect(
      screen.getByText("Oct 28, 2026", { selector: "time" })
    ).toBeInTheDocument();
  });

  it("discloses unavailable aggregate metrics separately from an illustrative fallback", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      metrics: { creditExtended: 0, outstandingLoans: 0 },
      availability: {
        metrics: { creditExtended: false, outstandingLoans: false },
        vaultTvl: true,
      },
      isPartialData: true,
    });
    renderDashboard();

    expect(screen.getByRole("status")).toHaveTextContent(
      /partial data.*unavailable/i
    );
    expect(
      screen.queryByText(/illustrative snapshot/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText("$0")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /example credit vault/i })
    ).toBeInTheDocument();
    expect(screen.getByText("$3.2M")).toBeInTheDocument();
  });

  it("retains available aggregates when vault TVL is unavailable", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      vaults: [{ ...productsData.vaults[0], tvl: "—", apy: "—" }],
      availability: { ...productsData.availability, vaultTvl: false },
      isPartialData: true,
    });
    renderDashboard();

    expect(screen.getByRole("status")).toHaveTextContent(/partial data/i);
    expect(screen.getByText("$1.4B")).toBeInTheDocument();
    expect(screen.getByText("$150M")).toBeInTheDocument();
    const table = screen.getByRole("table", {
      name: /public credit facilities/i,
    });
    expect(within(table).getAllByText("—")).toHaveLength(2);
    expect(within(table).queryByText("$0")).not.toBeInTheDocument();
  });

  it("uses availability per aggregate and preserves an explicitly supplied zero", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      metrics: { creditExtended: 0, outstandingLoans: 0 },
      availability: {
        metrics: { creditExtended: false, outstandingLoans: true },
        vaultTvl: true,
      },
      isPartialData: true,
    });
    renderDashboard();

    const credit = screen.getByText("Credit extended").closest("div")!;
    // The current aggregate API exposes TVL, not a separate loan-principal balance.
    const tvl = screen.getByText("Total value locked").closest("div")!;
    expect(credit).toHaveTextContent("—");
    expect(credit).not.toHaveTextContent("$0");
    expect(tvl).toHaveTextContent("$0");
  });

  it("shows loading placeholders instead of exposing the hook's initial fallback values", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      isLoading: true,
      isUsingFallback: true,
    });
    renderDashboard();

    expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
    expect(screen.queryByText("$1.4B")).not.toBeInTheDocument();
    expect(screen.queryByText("Example Credit Vault")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/illustrative snapshot/i)
    ).not.toBeInTheDocument();
  });

  it("identifies fallback metrics as illustrative and directs readers to the app", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      vaults: [],
      isUsingFallback: true,
    });
    renderDashboard();

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(
      /illustrative snapshot.*live data is unavailable/i
    );
    expect(
      within(status).getByRole("link", { name: /open.*app/i })
    ).toHaveAttribute("href", "https://app.pareto.credit/");
    expect(screen.getByText("$1.4B")).toBeInTheDocument();
    expect(screen.queryByText(/from the pareto api/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/facility data is unavailable/i)
    ).toBeInTheDocument();
  });

  it("renders the API metrics and supplied vault data with the existing app destination", () => {
    renderDashboard();

    expect(screen.getByRole("status")).toHaveTextContent(
      /from the pareto api/i
    );
    expect(
      screen.queryByText(/illustrative snapshot/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText("$1.4B")).toBeInTheDocument();
    expect(screen.getByText("$150M")).toBeInTheDocument();
    const table = screen.getByRole("table", {
      name: /public credit facilities/i,
    });
    expect(
      within(table).getByRole("link", { name: /example credit vault/i })
    ).toHaveAttribute("href", "https://app.pareto.credit/vault/0x123");
    for (const text of [
      "Example Operator",
      "USDC",
      "8.10%",
      "$3.2M",
      "RUNNING EPOCH",
    ]) {
      expect(within(table).getByText(text)).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: /read documentation/i })
    ).toHaveAttribute("href", "https://docs.pareto.credit/");
  });

  it("keeps a facility without an address visible without inventing a vault URL", () => {
    vi.mocked(useProductsData).mockReturnValue({
      ...productsData,
      vaults: [{ ...productsData.vaults[0], address: "" }],
    });
    renderDashboard();

    const table = screen.getByRole("table", {
      name: /public credit facilities/i,
    });
    expect(within(table).getByText("Example Credit Vault")).toBeInTheDocument();
    expect(within(table).queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("useProductsData dashboard boundary", () => {
  it.each([
    { apr: 7.25, fallback: false, expected: 7.25 },
    { apr: 0, fallback: false, expected: 0 },
    { apr: undefined, fallback: false, expected: null },
    { apr: null, fallback: false, expected: null },
    { apr: Number.NaN, fallback: false, expected: null },
    { apr: Infinity, fallback: false, expected: null },
    { apr: 7.25, fallback: true, expected: null },
  ])("normalizes weighted APR $apr with fallback $fallback to $expected", async ({ apr, fallback, expected }) => {
    const { useProductsData: useActualProductsData } = await vi.importActual<
      typeof import("../hooks/useProductsData")
    >("../hooks/useProductsData");
    const queryClient = new QueryClient();
    queryClients.push(queryClient);
    queryClient.setQueryData(["products-data"], {
      metrics: productsData.metrics,
      vaults: fallback ? [] : productsData.vaults,
      availability: productsData.availability,
      weightedAverageApr: apr,
    });

    const { result } = renderHook(() => useActualProductsData(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <ApiClientContext.Provider
            value={{
              client: createParetoPublicApiClient("/"),
              isReady: true,
              error: null,
            }}
          >
            {children}
          </ApiClientContext.Provider>
        </QueryClientProvider>
      ),
    });

    expect(result.current.weightedAverageApr).toBe(expected);
    expect(result.current.isUsingFallback).toBe(fallback);
    expect(result.current.isPartialData).toBe(!fallback && expected === null);
  });

  it("forwards partial availability from the actual hook while retaining the fetched vaults", async () => {
    const { useProductsData: useActualProductsData } = await vi.importActual<
      typeof import("../hooks/useProductsData")
    >("../hooks/useProductsData");
    const queryClient = new QueryClient();
    const availability = {
      metrics: { creditExtended: false, outstandingLoans: true },
      vaultTvl: false,
    };
    queryClient.setQueryData(["products-data"], {
      metrics: { creditExtended: 0, outstandingLoans: 150_000_000 },
      vaults: [{ ...productsData.vaults[0], tvl: "—" }],
      availability,
    });

    const { result, unmount } = renderHook(() => useActualProductsData(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <ApiClientContext.Provider
            value={{
              client: createParetoPublicApiClient("/"),
              isReady: true,
              error: null,
            }}
          >
            {children}
          </ApiClientContext.Provider>
        </QueryClientProvider>
      ),
    });

    expect(result.current.availability).toEqual(availability);
    expect(result.current.isUsingFallback).toBe(false);
    expect(result.current.isPartialData).toBe(true);
    expect(result.current.vaults[0]).toMatchObject({
      name: "Example Credit Vault",
      tvl: "—",
    });
    unmount();
    queryClient.clear();
  });
});
