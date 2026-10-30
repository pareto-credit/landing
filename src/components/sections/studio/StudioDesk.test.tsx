import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import StudioDesk from "./StudioDesk";
import { personaDesks } from "./studioDeskData";

const settings = vi.hoisted(() => ({ reduced: false }));
vi.mock("framer-motion", async (importOriginal) => ({
  ...(await importOriginal<typeof import("framer-motion")>()),
  useReducedMotion: () => settings.reduced,
}));
const advance = (ms = 2600) => act(() => vi.advanceTimersByTime(ms));

describe("automatic product preview sequences", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    settings.reduced = false;
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each([
    ["structuring", "Create vault", "Vaults"],
    ["operations", "Requests", "Requests"],
    ["participants", "Users", "Users"],
    ["reporting", "Reports", "Reports"],
  ] as const)(
    "renders %s as a native workspace page with matching navigation",
    (view, title, navigation) => {
      render(<StudioDesk desk={personaDesks[0]} workspaceView={view} isLive />);
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument();
      const sidebar = screen.getByRole("complementary", {
        name: "Preview workspace",
      });
      expect(
        within(sidebar).getByText(navigation).closest("[aria-current]")
      ).toHaveAttribute("aria-current", "page");
      expect(screen.getAllByText("studio.pareto.credit")).toHaveLength(1);
      expect(
        screen.queryByRole("heading", { name: "Overview" })
      ).not.toBeInTheDocument();
    }
  );

  it("animates requests in the native operations table", () => {
    render(
      <StudioDesk desk={personaDesks[0]} workspaceView="operations" isLive />
    );
    const requests = screen.getByRole("region", { name: "Preview requests" });
    advance();
    expect(within(requests).getByText("12,500,000 USDC")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Requests" })
    ).toBeInTheDocument();
  });

  it("saves and validates terms inside the native facility form", () => {
    render(
      <StudioDesk desk={personaDesks[0]} workspaceView="structuring" isLive />
    );
    const field = screen.getByRole("textbox", { name: "Facility name" });
    expect(field).toHaveValue("Aster Revolving Credit");
    expect(field).toHaveAttribute("readonly");
    const collateral = screen.getByRole("region", { name: "Collateral and custody configuration" });
    for (const label of ["Onchain", "Custody", "Asset pools"]) {
      expect(within(collateral).getByText(label, { exact: true })).toBeInTheDocument();
    }
    expect(collateral).toHaveTextContent("LTV & margin calls");
    expect(screen.getByText("Draft", { exact: true })).toBeInTheDocument();
    advance(2200);
    expect(
      screen.getByText("Terms saved", { exact: true })
    ).toBeInTheDocument();
    advance(2200);
    expect(
      screen.getByText("Ready for review", { exact: true })
    ).toBeInTheDocument();
  });

  it.each([
    ["participants", "Invited", "Review complete", "Active"],
    ["reporting", "Requested", "Received", "Available"],
  ] as const)(
    "updates %s status in its workspace table",
    (view, initial, intermediate, completed) => {
      render(<StudioDesk desk={personaDesks[0]} workspaceView={view} isLive />);
      const row = screen.getByRole("row", {
        name:
          view === "participants"
            ? /Harbour Capital/
            : /Borrower report.*Aster/,
      });
      expect(
        within(row).getByText(initial, { exact: true })
      ).toBeInTheDocument();
      advance(2200);
      expect(
        within(row).getByText(intermediate, { exact: true })
      ).toBeInTheDocument();
      advance(2200);
      expect(
        within(row).getByText(completed, { exact: true })
      ).toBeInTheDocument();
    }
  );

  it("adds new requests to the underwriter overview without playback UI", () => {
    render(<StudioDesk desk={personaDesks[0]} isLive />);
    expect(screen.getByText("Illustrative")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Transactions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Requests" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /pause|replay|next|play/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/01 \/ 04/)).not.toBeInTheDocument();
    const requests = screen.getByRole("region", { name: "Preview requests" });
    expect(
      within(requests).queryByText("12,500,000 USDC")
    ).not.toBeInTheDocument();
    advance();
    expect(within(requests).getByText("12,500,000 USDC")).toBeInTheDocument();
    expect(within(requests).getAllByRole("row")).toHaveLength(5);
    const count = screen.getByText("Pending requests").closest("div")!;
    expect(count).toHaveTextContent("10");
  });

  it("adds borrower transactions and updates the outstanding balance", () => {
    render(<StudioDesk desk={personaDesks[1]} isLive />);
    expect(screen.getByText("$51,400,000")).toBeInTheDocument();
    const transactions = screen.getByRole("region", {
      name: "Preview transactions",
    });
    advance();
    expect(
      within(transactions).getByText("12,500,000 USDC")
    ).toBeInTheDocument();
    expect(screen.getByText("$261,100,000")).toBeInTheDocument();
    expect(screen.getByText("$38,900,000")).toBeInTheDocument();
    advance();
    expect(
      within(transactions).getByText("Interest payment")
    ).toBeInTheDocument();
    expect(screen.getByText("$261,100,000")).toBeInTheDocument();
    advance();
    expect(screen.getByText("$254,850,000")).toBeInTheDocument();
    expect(screen.getByText("$45,150,000")).toBeInTheDocument();
  });

  it("holds the final event before completing, then resets on a role change", () => {
    const complete = vi.fn();
    const { rerender } = render(
      <StudioDesk desk={personaDesks[0]} isLive onComplete={complete} />
    );
    advance();
    advance();
    advance();
    expect(complete).not.toHaveBeenCalled();
    advance(3199);
    expect(complete).not.toHaveBeenCalled();
    advance(1);
    expect(complete).toHaveBeenCalledTimes(1);
    advance(10000);
    expect(complete).toHaveBeenCalledTimes(1);
    rerender(
      <StudioDesk desk={personaDesks[1]} isLive onComplete={complete} />
    );
    expect(screen.getByText("$248,600,000")).toBeInTheDocument();
    expect(
      screen.queryByText("New withdrawal request")
    ).not.toBeInTheDocument();
  });

  it("updates the lender portfolio for borrower reports, accrual and available withdrawals without prematurely deducting funds", () => {
    render(<StudioDesk desk={personaDesks[2]} isLive />);
    expect(
      screen.getByRole("heading", { name: "Portfolio" })
    ).toBeInTheDocument();
    const funds = screen.getByRole("region", { name: "Portfolio funds" });
    const performance = screen.getByRole("region", {
      name: "Portfolio performance",
    });
    const vaults = screen.getByRole("region", { name: "Lending vaults" });
    expect(within(funds).getByText("$31,016,216.38")).toBeInTheDocument();
    expect(within(funds).getByText("$25,000.00")).toBeInTheDocument();
    expect(within(performance).getByText("$1,109,824.93")).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Allocation" })
    ).toBeInTheDocument();
    expect(
      within(vaults).queryByRole("row", { name: /October report/i })
    ).not.toBeInTheDocument();
    advance();
    expect(
      within(vaults).getByRole("row", { name: /Aster.*October report/i })
    ).toBeInTheDocument();
    expect(within(funds).getByText("$31,016,216.38")).toBeInTheDocument();
    advance();
    expect(within(funds).getByText("$31,018,396.38")).toBeInTheDocument();
    expect(within(performance).getByText("$1,112,004.93")).toBeInTheDocument();
    expect(
      within(vaults).getByRole("row", { name: /Aster.*15,510,288.19/i })
    ).toBeInTheDocument();
    advance();
    expect(
      within(vaults).getByRole("row", {
        name: /Meridian.*25,000 USDC available/i,
      })
    ).toBeInTheDocument();
    expect(within(funds).getByText("$31,018,396.38")).toBeInTheDocument();
    expect(within(funds).queryByText("$25,000.00")).not.toBeInTheDocument();
    expect(screen.queryByText(/FalconX/i)).not.toBeInTheDocument();
  });

  it("stops offscreen and in a hidden tab, then resumes", () => {
    const { rerender } = render(<StudioDesk desk={personaDesks[0]} />);
    advance(9000);
    expect(screen.queryByText("12,500,000 USDC")).not.toBeInTheDocument();
    rerender(<StudioDesk desk={personaDesks[0]} isLive />);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    advance(9000);
    expect(screen.queryByText("12,500,000 USDC")).not.toBeInTheDocument();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    fireEvent(document, new Event("visibilitychange"));
    advance();
    expect(screen.getByText("12,500,000 USDC")).toBeInTheDocument();
    rerender(<StudioDesk desk={personaDesks[0]} />);
    advance(9000);
    expect(screen.queryByText("8,500,000 USDC")).not.toBeInTheDocument();
  });

  it("uses a composed static overview for reduced motion", () => {
    settings.reduced = true;
    const complete = vi.fn();
    render(<StudioDesk desk={personaDesks[0]} isLive onComplete={complete} />);
    advance(30000);
    expect(complete).not.toHaveBeenCalled();
    expect(screen.queryByText("12,500,000 USDC")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Overview" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows completed native configuration for reduced motion", () => {
    settings.reduced = true;
    render(
      <StudioDesk desk={personaDesks[0]} workspaceView="structuring" isLive />
    );
    expect(
      screen.getByText("Ready for review", { exact: true })
    ).toBeInTheDocument();
    advance(30000);
    expect(
      screen.getByText("Ready for review", { exact: true })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Draft", { exact: true })
    ).not.toBeInTheDocument();
  });

  it("pauses native access reviews while offscreen or in a hidden tab", () => {
    const { rerender } = render(
      <StudioDesk desk={personaDesks[0]} workspaceView="participants" />
    );
    const row = screen.getByRole("row", { name: /Harbour Capital/ });
    advance(9000);
    expect(within(row).getByText("Invited")).toBeInTheDocument();
    rerender(
      <StudioDesk desk={personaDesks[0]} workspaceView="participants" isLive />
    );
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    advance(9000);
    expect(within(row).getByText("Invited")).toBeInTheDocument();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    fireEvent(document, new Event("visibilitychange"));
    advance(2200);
    expect(within(row).getByText("Review complete")).toBeInTheDocument();
  });
});
