import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
    setViewportWidth(1280);

    render(<SyntheticDollarSection />);

    expect(screen.getByAltText("USP icon")).toBeInTheDocument();
    expect(screen.getByAltText("sUSP icon")).toBeInTheDocument();
  });

  it("renders clickable USP and sUSP cards that open the app in a new tab", () => {
    setViewportWidth(1280);

    render(<SyntheticDollarSection />);

    const uspCardLink = screen.getByRole("link", { name: /open usp in app/i });
    const suspCardLink = screen.getByRole("link", { name: /open susp in app/i });

    expect(uspCardLink).toHaveAttribute("href", "https://app.pareto.credit/usp");
    expect(uspCardLink).toHaveAttribute("target", "_blank");
    expect(suspCardLink).toHaveAttribute("href", "https://app.pareto.credit/usp");
    expect(suspCardLink).toHaveAttribute("target", "_blank");
  });

  it("keeps the sUSP label and title readable on the dark card", () => {
    setViewportWidth(1280);

    render(<SyntheticDollarSection />);

    const suspCardLink = screen.getByRole("link", { name: /open susp in app/i });
    const suspLabel = within(suspCardLink).getByText("sUSP");
    const suspTitle = within(suspCardLink).getByRole("heading", {
      name: /susp, the credit\s*index return/i,
    });

    expect(suspLabel).toHaveClass("text-[var(--color-text-inverse)]");
    expect(suspTitle).toHaveClass("text-[var(--color-text-inverse)]");
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

  it("uses a mobile slider with hidden scrollbar for the synthetic cards", () => {
    setViewportWidth(390);

    render(<SyntheticDollarSection />);

    expect(screen.getByTestId("synthetic-mobile-slider")).toHaveClass(
      "marquee-scroll",
      "overflow-x-auto",
      "touch-pan-x",
      "snap-x",
      "snap-mandatory",
      "lg:hidden",
    );
    expect(screen.getAllByRole("button", { name: /go to synthetic card/i })).toHaveLength(2);
  });

  it("keeps the desktop two-card grid on larger screens", () => {
    setViewportWidth(1280);

    render(<SyntheticDollarSection />);

    expect(screen.getByTestId("synthetic-desktop-grid")).toHaveClass(
      "hidden",
      "lg:grid",
      "lg:grid-cols-2",
    );
    expect(
      screen.queryByRole("button", { name: /go to synthetic card/i }),
    ).not.toBeInTheDocument();
  });

  it("scrolls to the centered sUSP card when a mobile pagination dot is pressed", () => {
    setViewportWidth(390);

    render(<SyntheticDollarSection />);

    const slider = screen.getByTestId("synthetic-mobile-slider") as HTMLDivElement;
    const scrollTo = vi.fn();
    slider.scrollTo = scrollTo;
    Object.defineProperty(slider, "clientWidth", {
      configurable: true,
      value: 390,
    });

    const suspCard = screen.getByTestId("synthetic-mobile-card-1");
    Object.defineProperty(suspCard, "offsetLeft", {
      configurable: true,
      value: 280,
    });
    Object.defineProperty(suspCard, "clientWidth", {
      configurable: true,
      value: 328,
    });

    fireEvent.click(
      screen.getByRole("button", { name: /go to synthetic card 2/i }),
    );

    expect(scrollTo).toHaveBeenCalledWith({
      left: 249,
      behavior: "smooth",
    });
  });

  it("captures pointer drag on mobile to scroll the synthetic cards", () => {
    setViewportWidth(390);

    render(<SyntheticDollarSection />);

    const slider = screen.getByTestId("synthetic-mobile-slider") as HTMLDivElement;
    const setPointerCapture = vi.fn();

    slider.setPointerCapture = setPointerCapture;
    slider.releasePointerCapture = vi.fn();
    slider.hasPointerCapture = vi.fn().mockReturnValue(false);

    Object.defineProperty(slider, "scrollLeft", {
      configurable: true,
      writable: true,
      value: 100,
    });

    fireEvent.pointerDown(screen.getByTestId("synthetic-mobile-card-0"), {
      pointerId: 1,
      clientX: 120,
    });
    fireEvent.pointerMove(slider, {
      pointerId: 1,
      clientX: 90,
    });

    expect(setPointerCapture).toHaveBeenCalledWith(1);
    expect(slider.scrollLeft).toBe(130);
  });
});
