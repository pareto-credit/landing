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

    const slider = screen.getByTestId("synthetic-mobile-slider");

    expect(slider).toHaveClass(
      "marquee-scroll",
      "overflow-x-auto",
      "overflow-y-hidden",
      "snap-x",
      "snap-mandatory",
      "lg:hidden",
    );
    expect(slider.className).not.toMatch(/\btouch-pan-[xy]\b/);
    expect(screen.getAllByRole("button", { name: /go to synthetic card/i })).toHaveLength(2);
    expect(screen.getByTestId("synthetic-mobile-card-0")).toHaveClass(
      "snap-center",
      "snap-always",
    );
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

  it("uses tighter card spacing on mobile while preserving desktop spacing", () => {
    setViewportWidth(390);

    render(<SyntheticDollarSection />);

    const uspSlide = screen.getByTestId("synthetic-mobile-card-0");
    const uspCardLink = within(uspSlide).getByRole("link", { name: /open usp in app/i });
    const title = within(uspCardLink).getByRole("heading", {
      name: /usp, the credit\s*index unit/i,
    });
    const description = within(uspCardLink).getByText(
      /usp tracks a diversified basket of loans/i,
    );
    const featureList = description.nextElementSibling;
    const stats = within(uspCardLink).getByText("Price").closest("div[aria-busy='false']");

    expect(uspCardLink).toHaveClass("p-8", "md:p-12");
    expect(title).toHaveClass("mt-5", "md:mt-5");
    expect(featureList).toHaveClass("my-5", "space-y-3", "md:mt-5", "md:space-y-4");
    expect(stats).toHaveClass("mt-auto", "gap-4", "pt-5", "md:gap-6");
  });

  it("keeps the mobile synthetic cards at a shared fixed height", () => {
    setViewportWidth(390);

    render(<SyntheticDollarSection />);

    const uspSlide = screen.getByTestId("synthetic-mobile-card-0");
    const suspSlide = screen.getByTestId("synthetic-mobile-card-1");
    const uspCardLink = within(uspSlide).getByRole("link", { name: /open usp in app/i });
    const uspStats = within(uspCardLink).getByText("Price").closest("div[aria-busy='false']");

    expect(uspSlide).toHaveClass("h-[36rem]", "md:h-auto");
    expect(suspSlide).toHaveClass("h-[36rem]", "md:h-auto");
    expect(uspCardLink).toHaveClass("flex", "h-full", "flex-col");
    expect(uspStats).toHaveClass("mt-auto");
  });
});
